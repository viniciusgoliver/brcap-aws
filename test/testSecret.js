const BRCAPAWS = require('../index.js');

const fs = require('fs');

//Preencher o JSON a ser criptografado e criado o arquivo para ser enviado para o S3"
const properties = { "key": "<nameProperties>", "idTeste": "1", "urlTeste": "https://apis-dev.brasilcap.info/teste/darwin" };

//Preencher com key Id do KMS na AWS, exemplo "properties-dev"
const keyId = '<keyId_KMS';

//Preencher o nome do arquivo a ser gerado com o JSON criptografado para ser enviado para o S3"
const pathNameWriteFile = 'test/<arquivo-properties>'

const regionKMS = 'sa-east-1'


BRCAPAWS.Kms_encrypt(keyId, regionKMS, JSON.stringify(properties), function (err, data) {

    console.log('cifrando: ', JSON.stringify(properties));

    if (err) {
        console.log(err);
    } else {
        //console.log('DATA: ', data);
        //console.log('data.CiphertextBlob: ', data.CiphertextBlob);
        //console.log('Buffer DATA: ', Buffer.from(data.CiphertextBlob).toString("base64"));

        fs.writeFileSync(pathNameWriteFile, Buffer.from(data.CiphertextBlob));

        BRCAPAWS.Kms_decrypt(data.CiphertextBlob, regionKMS, function (err, dataDecripted) {
            if (err) {
                console.log(err);
            } else {
                console.log(dataDecripted);
            }
        });
    }
});

//Inserir o nome do bucket do properties criptografado para buscar e descriptografar para verificar o conteudo
const bucketS3 = '<bucketS3>';

//Inserir o nome do arquivo do properties criptografado para buscar e descriptografar para verificar o conteudo
const fileNameS3 = '<fileNameS3>';

BRCAPAWS.S3_Get(bucketS3, fileNameS3, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('data: ', data);
        BRCAPAWS.Kms_decrypt(data.Body, 'sa-east-1', function (err, dataDecripted) {
            if (err) {
                console.log(err);
            } else {
                console.log('S3_Get:', dataDecripted);
            }
        });
    }
});
