namespace pathing {
    //% block
    export function shearX(amount: number, img: Image): Image {
        const gradient = amount / img.height;
        let res = image.create(img.width, img.height);
        for (let y = 0, j = - img.height / 2; y < img.height; ++y, ++j) {
            for (let x = 0; x < img.width; ++x) {
                const offset = gradient * j;
                res.setPixel(x + offset,y, img.getPixel(x,y));
            }
        }
        //res.copyFrom(img);
        //res = img.clone();//res.fill(2);
        return res;
    }

    
}