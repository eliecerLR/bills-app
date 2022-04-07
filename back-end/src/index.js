const sequelize = require('./database/connection');
const app = require('./server');

async function main() {
    await app.listen(app.get('port'))
    console.log(`App listen on port ${app.get('port')}`)

    try {
        await sequelize.authenticate()
        console.info('Connection Successfull')
    } catch (error) {
        console.error('Unable to connect with DB:', error)
    }

}

main();
