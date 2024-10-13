function convertToPDF() {
  const htmlContent = document.getElementById("html-input").value;

  fetch("https://api.pdfshift.io/v3/convert/pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + btoa("api:sk_5d17ee57063b2839296de3098fec70feb6eb2fe8"),
    },
    body: JSON.stringify({
      source: htmlContent,
      landscape: false,
      use_print: false,
    }),
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.getElementById("download-link");

      const iframe = document.getElementById("pdf-preview");
      iframe.src = url;

      link.href = url;
      link.style.display = "block";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
