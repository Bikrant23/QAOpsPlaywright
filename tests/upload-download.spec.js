const ExcelJS = require('exceljs');
const {test, expect} = require('@playwright/test');

//Fetch all data from workbook
async function writeExcel(searchText,replacedText,update,filePath) {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet,searchText);

    //Update the fetched data
    // const cell =  worksheet.getCell(output.row,output.column);
    const cell =  worksheet.getCell(output.row,output.column+update.colChange);
    // cell.value = replacedText;
    cell.value = replacedText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText) {

    let output = {row:-1,column:-1};

    worksheet.eachRow((row,rowNumber) => {
        row.eachCell( (cell,colNumber) => {
            // console.log(cell.value); //Fetching all data
            if(cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });

    return output;
}

//Update Price of an Item
test('Upload Download Excel Validation', async ({page}) => {

    const textSearch = 'Kivi';
    const updatePrice = '999';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');

    await page.locator("#downloadButton").click(); //Download the Spreadsheet from the Web

    await downloadPromise;

    await writeExcel(textSearch,updatePrice,{rowChange: 0, colChange: 2},"C:/Users/Brikanta/Downloads/download.xlsx"); // Update the speadsheet

    //Upload the updated spreadsheet
    // await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/Brikanta/Downloads/download.xlsx");
    //setInputFiles() will only work if the component have attribute as type="file"

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    const desiredPrice = desiredRow.locator("#cell-4-undefined");
    await expect(desiredPrice).toContainText(updatePrice);
});