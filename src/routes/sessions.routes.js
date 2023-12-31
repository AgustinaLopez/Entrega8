const Router = require ('express');
const usersModel = require ('../dao/models/users.model.js');

const router = Router();

router.post('/register', async (req, res)=>{
    const {first_name, last_name, email, age, password} = req.body;

    const usuarioExistente = await usersModel.findOne({email})
    if (usuarioExistente) {
        return res.status(400).send({status:'error', message: 'Usuario ya registrado'})
    }
    const user ={
        first_name,
        last_name,
        email,
        age,
        password
    }

    const result = await usersModel.create(user);
    res.send({status:'success', message: 'Usuario creado con exito'})
});

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    const user = await usersModel.findOne({email, password});

    if(!user){
        return res.status(400).send({status: 'error', message: 'Usuario No encontrado'})
    }else if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user ={
            first_name: `${user.first_name} ${user.last_name} `,
            email: user.email,
            age: user.age,
        }
        req.session.admin = true
    }

    req.session.user ={
        first_name: `${user.first_name} ${user.last_name} `,
        email: user.email,
        age: user.age,
        rol: user
    }

    res.send({status: 'success', message: 'Ingresaste correctamente'});

});

function logOut(){
    req.session.destroy(error =>{
        if (error){
            res.json({ error: "error de salida", message: "No se ha podido cerrar la sesion"})
        }
        res.send('Sesion cerrada correctamente')
    })
}


// function auth(req, res, next){
//     if(req.session.admin){
//         return next
//     }else {
//         return res.status(401).send('Usuario no autorizado')
//     }
// }

// router.get('/', auth, (req, res) =>{
//     res.send('Bienvenido como admin')
// })



export default router;