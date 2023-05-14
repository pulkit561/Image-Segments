# Image-Segments
React app to show an image's segments from click co-ordinates

## Dependencies
- Node package manager (npm) : https://www.npmjs.com/
- Google Firebase : https://firebase.google.com/
  1. Firebase storage
  2. Firetore database 
- react : https://www.npmjs.com/package/react
- react-dom : https://www.npmjs.com/package/react-dom
- react-modal : https://www.npmjs.com/package/react-modal

## Design
  - ### Functional component:
    1. Each individual entity, **Thumbnail**, **FullImage** and **Firebase** , is modelled as a functional                component with web hooks. 
    2. Used canvas to draw dimished size thumbnails from main image's URLs.  

 - ### Storage and database:
    1. Used **Firebase Storage** to store images. Every main image - [segments] pair is stored in a separate            folder reference with timestamp as it's name so that there are no overlaps even though uploaded images can        have same names.  
    2. Used **Firestore Database** to store main image URL and it's segments' URLs in a document. This is                required for figuring out the pixel containing segment.  
    
## Comments
  1. Added comments in the code for better understanding.  
  2. Need to enable **CORS** in firebase server and also in the client side sending requests to firebase. By          default this is disabled for security and we cannot use canvas to get the image's data. Please refer [here](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) for more details.  
  3. Kept primitive styling as the focus was not on this.  
  4. [Improvement]: Can add an authentication workflow using **OAuth 2.0** (maybe login with google account) to         allow only authenticated users to write & read data to firebase. For now kept the read/write rules as             public.  
