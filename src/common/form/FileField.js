import React, { Component } from 'react';
import { Img } from '../styles/fields';
import user from 'asserts/img/user.png';

class FileField extends Component {

    static defaultProps = {
        previewLogoUrl: user,
        mimeType: "image/jpeg, image/png"
    };

    __handleChange(event, input) {
        event.preventDefault();
        let imageFile = event.target.files[0];
        if (imageFile) {
            const localImageUrl = URL.createObjectURL(imageFile);
            const imageObject = new window.Image();
            imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth;
                imageFile.height = imageObject.naturalHeight;
                input.onChange(imageFile);
                URL.revokeObjectURL(imageFile);
            };
            imageObject.src = localImageUrl;
            this.__handlePreview(localImageUrl);
        }
    }

    __handlePreview(imgURL) {
        const previewImageDom = document.querySelector(".preview-image");
        previewImageDom.src = imgURL;
    }

    render() {
        const { input, type, meta, mimeType, previewLogoUrl } = this.props;

        return (
            <div>
                <div className="input-group center-block">
                    <Img src={previewLogoUrl} className="img-rounded img-responsive center-block preview-image" alt="Visualização" />
                </div><br />

                <input
                    type={type}
                    name={input.name}
                    accept={mimeType}
                    className={(meta.touched && meta.error) ? input.className + " input-error" : input.className}
                    onChange={event => this.__handleChange(event, input)}
                />

                <p className="text-danger">
                    {meta && meta.invalid && meta.error && (<span>{meta.error}</span>)}
                </p>
            </div>
        )
    }
}

export { FileField };