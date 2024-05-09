import bcrypt from 'bcrypt'

async function run() {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash('test1234', salt)
    console.log(salt);
    console.log(hash);

} run()