
//% blockNamespace=images
//% group=Transformations
namespace imagesExt {

    export enum RotationType {
        ShearRotate = 0
        //Covering = 1
    }

    function shearOffset(gradient: number, j: number, size: number) {
        return Math.round(gradient * (j - (size >> 1)));
    }

    //% block="shearX $img by $amount"
    //% img.shadow=screen_image_picker
    export function shearX(gradient: number, img: Image): Image {
        let res = image.create(img.width, img.height);
        for (let y = 0; y < img.height; ++y) { 
            const offset = shearOffset(gradient, y+0.5, img.height);
            for (let x = 0; x < img.width; ++x) {
                res.setPixel(x + offset,y, img.getPixel(x,y));
            }
        }
        return res;
    }

    //% block="shearY $img by $amount"
    //% img.shadow=screen_image_picker
    export function shearY(gradient: number, img: Image): Image {
        let res = image.create(img.width, img.height);
        for (let x = 0; x < img.width; ++x) {
            const offset = shearOffset(gradient, x+0.5, img.width);
            for (let y = 0; y < img.height; ++y) { 
                res.setPixel(x ,y + offset, img.getPixel(x,y));
            }
        }
        return res;
    }

    //% block="$ShearRotate $img by $degrees degrees"
    //% img.shadow=screen_image_picker
    export function rotate(rotationType: RotationType, degrees: number, img: Image): Image {
        switch (rotationType) {
            case RotationType.ShearRotate: return shearRotate2(degrees, img);
        }
    }


    function shearRotate2(degrees: number, img: Image): Image {
        /* rotation by shearing
        shear in X by -tan(angle/2)
        shear in Y by sin(angle)
        shear in X by -tan(angle/2)
        */
        let res = image.create(img.width, img.height);
        
        // normalize angle to -180:180
        degrees = degrees - Math.floor((degrees + 180) / 360) * 360;
        if (degrees < -90 || 90 < degrees) {
            img = img.clone();
            img.flipX();
            img.flipY();

            degrees = degrees - 180;
        }

        const rad = degrees * Math.PI / 180;
        const t = -Math.tan(rad / 2);
        const s = Math.sin(rad);

        for (let x = 0; x < img.width; ++x) {
            for (let y = 0; y < img.height; ++y) { 
                const ax = x + shearOffset(t, y, img.height);
                const by = y + shearOffset(s, ax, img.width);
                const cx = ax + shearOffset(t, by, img.height);
                if ()

                res.setPixel(cx, by, img.getPixel(x, y));
            }
        }
        return res;

    }


    // Same as above, but performs three actual shearing operations.
    function shearRotate(degrees: number, img: Image): Image {
        //return img.rotated(-180);
        const rad = degrees * Math.PI / 180;
        const tanRadHalf = -Math.tan(rad / 2);
        let rotImage = shearX(tanRadHalf, img);
        rotImage = shearY(Math.sin(rad), rotImage);
        rotImage = shearX(tanRadHalf, rotImage);
        return rotImage;
    }

    // export function imageRotated(img: Image, deg: number) {
    //     if (deg == -90 || deg == 270) {
    //         let r = img.transposed();
    //         r.flipY();
    //         return r;
    //     } else if (deg == 180 || deg == -180) {
    //         let r = img.clone();
    //         r.flipX();
    //         r.flipY();
    //         return r;
    //     } else if (deg == 90) {
    //         let r = img.transposed();
    //         r.flipX();
    //         return r;
    //     } else {
    //         return null;
    //     }
    // }
    
}