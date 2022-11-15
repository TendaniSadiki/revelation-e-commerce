import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fire, { auth, db } from "../Config/Config";
import { useNavigate } from "react-router-dom";
import {Navbar} from './Navbar';
import _, { size } from "underscore";
import { uid } from "uid";
import { onAuthStateChanged } from 'firebase/auth';
import './ProductView'

function ProductVIew(individualProduct, ID, individualCartProduct) {
    const uidd = uid();
  const location = useLocation();
  const [products, setProducts] = useState({});
  const [productColours, setProductColours] = useState([]);
  const [productColoursList, setProductColoursList] = useState([]);
  const [productSizeList, setProductSizeList] = useState([]);
  const [selectColour, setSelectColour] = useState("");
  const [finalObj, setFinalObj] = useState("");
  const [show,setShow]=useState(true); 
  const navigate = useNavigate();
  function GetCurrentUser() {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unbn = onAuthStateChanged(auth, user => {
            if (user) {
                fire.firestore().collection("user").doc(user.uid).get().then(snapshot => {
                    setUser(snapshot.data().FullName)
                })
            } else {


                setUser(null)
            }
        })
        return unbn
    }, [])
    return user;


}
  const user = GetCurrentUser();
  const addCart = (id) => {
    navigate('/cart');

    db
      .collection("cart")
      .doc(finalObj.colour + '_' + finalObj.size + '_' + finalObj.productCode).set(finalObj).then(() => {
        console.log('Finished!!')
      })
      
    // console.log("Hi", finalObj);
  };

  let colours = [];
  useEffect(() => {
    const products = db
      .collection("inventorystock")
      .doc(location.state.id)
      .get();
    products.then((res) => {
      console.log(res.data());
      setProducts(res.data());
    });

    const productColours = db
      .collection("inventorystock")
      .doc(location.state.id)
      .collection("colours")
      .get();
    productColours.then((res) => {
      res.forEach((element) => {
        console.log("Element: ", element.data());
        colours.push(element.data());
      });
      setProductColoursList(colours);
      var mySubArray = _.uniq(colours, "colour");
      console.log("Element: ", mySubArray);
      setProductColours(mySubArray);
    });
  }, []);

  return (
    <div className="prod">
      <div className="image"> 
         <img src={products.image} height={100} alt="productImage" />
      </div>
    <div className="info">
      <div  className="infos">
      <h1>{products.prodName}</h1>
       <p style={{color:"red"}}>R 250</p>
      <p>{products.prodDescription}</p>
     
      </div>
      <br/>
      <br/>
         <div className="color">
        {productColours !== 0 ? (
          productColours.map((prod, idx) => {
            const testClick = (prodt) => {
              setSelectColour(prodt.colour);
              console.log(prodt.colour);
              let sizeList = [];
              productColoursList.find((x) => {
                if (x.colour == prodt.colour) {
                  sizeList.push(x);
                }
              });
              console.log("hello", sizeList);
              setProductSizeList(sizeList);
            };

            return (
              <div className="colorblock">
                <div key={idx} onClick={() => testClick(prod)}>
                  <p
                    style={{
                     
                      padding: "28px",
                      background: "whitesmoke",
                       margin:"30px",
                      
                    }}
                  >
                    {prod.colour}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div>No product colours available for this product</div>
        )}
      </div>
        {/* Mapping the sizes of the selected colour */}

        <div className="size">
        {productSizeList.map((sizes, idx) => {
          return (
            <div   className="sizeblock"
              style={{ display: "inline-block" }}
            //  create method and create a variable(state) for qty using the decrement and increment functonality.
              onClick={() => {
                setFinalObj(Object.assign(products,  sizes, {qty: 2,uid: uidd }))
                console.log(Object.assign(products,  sizes, {qty: 2}));
        
              }}
              >
                
              
                
              <p style={{ margin: "8px" }}>
                {sizes.size} : R{sizes.price}
              </p>
            </div>
           );
          })}
         
     </div>
     <div className="buttons">
     <div
        className="cart-btn"
        onClick={() => addCart()}
      >
        Add To Cart{" "}
      </div>
      <div
        className="cart-btn1"
        onClick={() => addCart()}
      >
        BUY NOW{" "}
      </div>
      </div>
      </div>
    </div>
    
  );
}

export default ProductVIew;
