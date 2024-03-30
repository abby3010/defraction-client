import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUpload = ({ data, setData }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = data.images;


        if (files) {

            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`,
                            { image: uri },
                            {
                                headers: {
                                    authtoken: user ? user.token : "",
                                },
                            })
                            .then((res) => {
                                allUploadedFiles.push(res.data);
                                setData({ ...data, images: allUploadedFiles });
                                console.log('UPLOAD RES DATA', res.data);
                            })
                            .catch((err) => {

                                console.log('UPLOAD EROR', err);
                            });
                    },
                    "base64");
            }
        }
    };

    // const handleImageRemove = (public_id) => {

    //     axios
    //         .post(
    //             `${process.env.REACT_APP_API}/removeimage`,
    //             { public_id },
    //             {
    //                 headers: {
    //                     authtoken: user ? user.token : "",
    //                 },
    //             }
    //         )
    //         .then((res) => {

    //             const { images } = data;
    //             let filteredImages = images.filter((item) => {
    //                 return item.public_id !== public_id;
    //             });
    //             setData({ ...data, images: filteredImages });
    //         })
    //         .catch((err) => {
    //             console.log(err);

    //         });
    // };

    return (
        <>
            <div className="row">
                {data.images &&
                    data.images.map((img, i) => (
                        <div
                            key={i}
                            // onClick={() => handleImageRemove(img.public_id)}
                            className="col-md-4"
                        >

                        <img
                            src={img.url}
                            className="ml-3"
                            // key={img.url}
                            alt={img.public_id}
                        />
                        </div>
                    ))}
            </div>
            <br />
            <div className="row">
                <label className="btn btn-primary btn-raised">Choose Files
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="images/*"
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    );
}

export default FileUpload;