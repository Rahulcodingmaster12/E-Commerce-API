import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next)=>{

    // 1. Check if authorization is empty.

    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).send("No authorization details found");
    }
    console.log(authHeader);
    // 2. Extract credentials. [Basic qwertyasdfasdf43453453jsldkfja]

    const base64Credentials = authHeader.replace('Basic ','');
    console.log(base64Credentials);

    // 3. decode credentials.

    const decodeCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
    console.log(decodeCreds); // [username:password]
    const creds = decodeCreds.split(':');

    const user = UserModel.getAll().find(u=> u.email== creds[0] && u.password == creds[1]);

    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;