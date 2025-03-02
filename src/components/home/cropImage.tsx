export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
) {
    return new Promise<string>((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.crossOrigin = "anonymous"; // solve the CORS issue

        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                reject(new Error("Cannot get canvas context"));
                return;
            }

            ctx.drawImage(
                image,
                pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
                0, 0, pixelCrop.width, pixelCrop.height
            );

            const croppedImage = canvas.toDataURL("image/jpeg");
            resolve(croppedImage);
        };

        image.onerror = (error) => reject(error);
    });
}
