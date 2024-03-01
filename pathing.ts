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
        return res;
    }

    export function shearY(amount: number, img: Image): Image {
        const gradient = amount / img.width;
        let res = image.create(img.width, img.height);
        for (let x = 0, j = - img.width / 2; x < img.width; ++x, ++j) {
            for (let y = 0; y < img.height; ++y) { 
                const offset = gradient * j;
                res.setPixel(x ,y + offset, img.getPixel(x,y));
            }
        }
        return res;
    }

    /* Forward rotation by shearing
    shear in X by -tan(angle/2)
    shear in Y by sin(angle)
    shear in X by -tan(angle/2)



    */

    
}