import bcrypt from "bcrypt";

const num = 10;
const minhaSenha = 'senha123';
const saidaSenha  = 'nao_bacon';

bcrypt.genSalt(num, function(err, salt){
    
    bcrypt.hash(saidaSenha, salt, function(err, hash){
        console.log('---------------------------------')
        console.log(hash)
        console.log(saidaSenha)
        console.log('----------------------------------')
    })
})

const salt = bcrypt.genSaltSync(num);
const hash = bcrypt.hashSync(minhaSenha, salt)
const compare = bcrypt.compareSync("senha123", hash)

console.log("Senha valida:", compare)
console.log(hash)
console.log(minhaSenha)