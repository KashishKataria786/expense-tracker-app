import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"]; 
  const token = authHeader 

  if (!token) {
    return res.status(401).json({ error: "Please login to access content" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log("De",decoded)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const readOnlyPolicy= (req,res,next)=>{
  const role = req.user.role;
  if(!role)return res.status(500).json({error:"Server Error"});
  try {
    if(role==='READ_ONLY'){
      return res.status(401).json({error:"Not Authorized"});
    }else{
      req.user=req.user
      next();
    };
  } catch (error) {
    return res.status(401).json({error:"Inavlid or Expired Token"})
  }
}