// Import CryptoJS
import { SHA256, enc } from 'crypto-js';


function encrypt(pass){
    const hash = SHA256(pass);
    
    const hashHex = hash.toString(enc.Hex);
    
    return hash;
}

export default encrypt