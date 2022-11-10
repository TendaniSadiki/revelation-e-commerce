import React,{useState} from 'react'
import { storage,db } from '../Config/Config';

export const AddProduct = () => {
    const[productName, setProductName]= useState();
    const[productDescription, setProductDescription]= useState();
    const[productPrice, setProductPrice]= useState();
    const[productImage, setProductImage]= useState(null);
    const[brand]
    const[imageError, setImageError]= useState("")
   
    const[uploadError, setUploadError]= useState();
    const[successMsg, setSuccessMsg]= useState();
    const type= ['image/jpg','image/jpeg', 'image/png','image/PNG'];
    const handleProductImg =(e)=>{
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&& type.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError()
            }else{
                setProductImage(null)
                setImageError("Please select valid image type (png, jpeg)")
            }
        }else{
            console.log("Select file")
        }
    }
    const handleAddProduct=(e)=>{
        e.preventDefault();
        const uploadTask =  storage.ref(`product-image/${productImage.name}`).put(productImage);
        uploadTask.on('state_changed', snapshot=>{
            const progress =(snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(progress)
        }, error=>{
            setUploadError(error.message)}
            ,()=>{
            storage.ref('product-image').child(productImage.name).getDownloadURL().then(url=>{
                db.collection('Product').add({
                    productName:productName,
                    productDescription:productDescription,
                    productPrice:Number(productPrice),
                    productImage:url
                }).then(()=>{
                    setProductName('');
                    setProductDescription('');
                    setProductPrice(0);
                    setProductImage('')


                })
            })
        })

    }
  return (
    <div className='container'>
        <br></br>
        <br></br>
        <h1>AddProduct</h1>
        <hr></hr>
        {successMsg &&<>
            <div className='success-msg'>{successMsg}</div>
        </>}
        <form autoComplete='off' className='from-group' onSubmit={handleAddProduct}>
            <lable>Product Name</lable>
            <input type='text' className='form-control' required onChange={(e)=> setProductName(e.target.value)} value={productName}/>
            <br></br>
            <label>Product Description</label>
            <input type ='text' className = 'form-control' required onChange={(e)=> setProductDescription(e.target.value)} value={productDescription}/>
            <br></br>
            <label>Product Price</label>
            <input type ='text' className = 'form-control' required onChange={(e)=> setProductPrice(e.target.value)} value={productPrice}/>
            <br></br>
            <label>Upload Product Image</label>
            <input type ='file' id="file" className = 'form-control' required onChange={handleProductImg}/>
            <br></br>
            {imageError&&<>
            <div className='error-msg'>{imageError}</div>
            <br></br>
            </>

            }
            {/* style={{display:'flex', justifyContent:'flex-end'}} */}
            <div >
                <button type='submit' className='btn btn-success btn-md'>SUBMIT</button>
            </div>
        </form>
        {uploadError&&<>
            <div className='error-msg'>{uploadError}</div>
        </>

        }
        </div>
  )
}
