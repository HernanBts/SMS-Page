const app = require('./server');

require('./database');

app.listen(app.get('port'), () => {
    console.log('Server runing in port', app.get('port'));
});