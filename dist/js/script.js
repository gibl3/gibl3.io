document.addEventListener("DOMContentLoaded", function () {
  const re =
    /(http[s]?):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  const htmlInput = document.querySelector("#html-input");
  const convertBtn = document.querySelector("#convert-btn");
  const uploadHtml = document.querySelector("#upload-html");

  uploadHtml.addEventListener("click", async function () {
    const fileHandle = await window.showOpenFilePicker({
      types: [
        {
          description: "HTML Files",
          accept: { "text/html": [".html"] },
        },
      ],
    });

    const file = await fileHandle[0].getFile();
    const blob = await file.text();
    const fileName = file.name;
    htmlInput.value = fileName;

    convertToPDF(blob);
  });

  convertBtn.addEventListener("click", function () {
    const htmlContent = htmlInput.value;
    console.log(htmlContent);

    if (htmlContent.trim() === "") {
      alert("Please enter some HTML content.");
    } else if (re.test(htmlContent)) {
      convertToPDF(htmlContent);
    } else {
      alert("Please enter a valid URL.");
    }
  });
});

async function convertToPDF(htmlContent) {
  try {
    const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa("api:sk_1d2a3fb1d23432a84fca8c5590255ce782e2cda2"),
      },
      body: JSON.stringify({
        source: htmlContent,
        margin: {
          // Optional: set margins
          top: "10mm",
          right: "10mm",
          bottom: "10mm",
          left: "10mm",
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    document.querySelector("#loader").style.display = "block";
    document.querySelector("#preview-label").style.display = "none";

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    document
      .querySelector("#download-pdf")
      .addEventListener("click", async () => {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: "converted.pdf",
          types: [
            {
              description: "PDF Files",
              accept: { "application/pdf": [".pdf"] },
            },
          ],
        });

        const writable = await fileHandle.createWritable();

        // Write data to the file
        await writable.write(blob);

        // Close the file and save the changes
        await writable.close();

        window.alert("File saved successfully!");

        URL.revokeObjectURL(url);

        document.querySelector("#preview").src = "";
        document.querySelector("#html-input").value = "";
      });

    document.querySelector("#loader").style.display = "none";
    document.querySelector("#preview").src = "";
    document.querySelector("#preview").src = url;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
