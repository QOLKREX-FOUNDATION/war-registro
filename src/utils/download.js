import domtoimage from "dom-to-image";

export const downloadImage = (ref, title, height, width, quality) => {
	domtoimage
		.toPng(ref.current, { cacheBust: true, quality, height, width })
		.then(function (dataUrl) {
			var link = document.createElement("a");
			link.download = title;
			link.href = dataUrl;
			link.crossOrigin = "Anonymous";

			link.click();
		});
};
