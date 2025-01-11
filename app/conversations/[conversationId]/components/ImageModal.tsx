'use client';

import Model from "@/app/components/Model";
import Image from "next/image";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {

    if (!src) {
        return null;
    }

    return (
        <Model isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image 
                alt="image"
                src={src}
                fill
                className="object-cover"
                />
            </div>

        </Model>
    )
}

export default ImageModal;