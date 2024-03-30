import React from 'react'
import { addNFT } from '../api/api';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddNFT() {
    const [data, setData] = React.useState({});
    const [image, setImage] = React.useState(null);
    const [displayImage, setDisplayImage] = React.useState(null);
    const { user } = useSelector((state) => ({ ...state }));

    const handleFileUpload = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
        setData({ ...data, "image": event.target.files[0], "user": user.user });
        setDisplayImage(URL.createObjectURL(event.target.files[0]));

        console.log(image);
    }

    const handleTextInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const result =
            await addNFT(data)
                .then((res) => {
                    toast.success("NFT added successfully");
                    window.location.reload();
                })
        console.log(result);
    }
    return (

        <div className="vh-100 d-flex justify-content-center">
            <div className="form-access my-auto">
                <form onSubmit={handleFormSubmit}>
                    <span>Add Your NFT</span>
                    <input
                        id="choose-file"
                        type="file"
                        name="image"
                        onChange={handleFileUpload}
                    />
                    <br />
                    <br />
                    <div>
                        {displayImage &&
                            <img
                                alt="Profile"
                                src={displayImage}
                                style={{ width: 200, height: 125 }} />}
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" name='name' onChange={handleTextInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Organisation" name='organization' onChange={handleTextInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Price" name='price' onChange={handleTextInputChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Total number of shares" name='shares' onChange={handleTextInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Add NFT</button>
                </form>
            </div>
        </div>

    )
}
