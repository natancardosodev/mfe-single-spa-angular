# VirtualHost do Apache para Projetos Internos

## Front-end

Execute no terminal:

```shell
sudo -i
cd /etc/apache2/sites-available
gedit deve-ssl.voxtecnologia.com.br.conf
```

Colar código abaixo após outro algum alias existente. Trocar `/sigfacil/pessoa-fisica` por endereço base do projeto e
`/vox/pessoa-fisica-internal-front/dist` por caminho do diretório de build

```
Alias /sigfacil/pessoa-fisica /vox/pessoa-fisica-internal-front/dist
<Directory /vox/pessoa-fisica-internal-front/dist>
    SSLRequireSSL
    Options FollowSymLinks
    AllowOverride None
    Require all granted
    <IfModule mod_rewrite.c>
        Options -MultiViews
        RewriteEngine On
        RewriteCond %{REQUEST_URI}::$1 ^(/.+)/(.*)::\2$
        RewriteRule ^(.*) - [E=BASE:%1]
        RewriteCond %{REQUEST_FILENAME} -f
        RewriteRule .? - [L]
        RewriteRule .? %{ENV:BASE}/index.html [L]
    </IfModule>
</Directory>
```

## Back-end

Execute os comandos abaixo trocando `pessoa-fisica` pelo endereço da API.

```shell
touch deve-pessoa-fisica-service.voxtecnologia.com.br.conf

ln -s /etc/apache2/sites-available/deve-pessoa-fisica-service.voxtecnologia.com.br.conf /etc/apache2/sites-enabled/deve-pessoa-fisica-service.voxtecnologia.com.br.conf

gedit deve-pessoa-fisica-service.voxtecnologia.com.br.conf
```

Cole o conteúdo abaixo, trocando `deve-pessoa-fisica-service` pelo caminho da API e `/vox/pessoa-fisica-service` pelo
nome do projeto.

```
<VirtualHost deve-pessoa-fisica-service.voxtecnologia.com.br:443>
    ServerName deve-pessoa-fisica-service.voxtecnologia.com.br
    ServerAdmin suporte.tecnico@voxtecnologia.com.br

    setEnv APP_ENV dev

    Options -Indexes

    ErrorLog  /var/log/apache2/pessoa-fisica-service-ssl.voxtecnologia.com.br.error_log
    CustomLog /var/log/apache2/pessoa-fisica-service-ssl.voxtecnologia.com.br.log combined

    SSLEngine On
    ServerSignature On
    SSLVerifyDepth 10
    SSLCertificateChainFile /etc/apache2/conf.cert/voxtecnologia/gd_bundle.crt
    SSLCertificateFile /etc/apache2/conf.cert/voxtecnologia/voxtecnologia.com.br.crt
    SSLCertificateKeyFile /etc/apache2/conf.cert/voxtecnologia/voxtecnologia.com.br.key
    SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
    SSLOptions +FakeBasicAuth -StrictRequire
    SSLVerifyClient none
    SSLOptions +StdEnvVars -ExportCertData

    SetEnvIf Origin "^(.*\.voxtecnologia\.com\.br)" ORIGIN_SUB_DOMAIN=$1
    Header set Access-Control-Allow-Credentials "true"
    Header set Access-Control-Allow-Origin "%{ORIGIN_SUB_DOMAIN}e" env=ORIGIN_SUB_DOMAIN
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "*"

    DocumentRoot /vox/pessoa-fisica-service/public

    <Directory /vox/pessoa-fisica-service/public>
        AllowOverride None
        Require all granted

        <IfModule mod_rewrite.c>
            Options -MultiViews
            RewriteEngine On
            RewriteCond %{REQUEST_URI}::$1 ^(/.+)/(.*)::\2$
            RewriteRule ^(.*) - [E=BASE:%1]
            RewriteCond %{REQUEST_FILENAME} -f
            RewriteRule .? - [L]
            RewriteRule .? %{ENV:BASE}/index.php [L]
        </IfModule>
    </Directory>

    <Files ~ "\.(inc|ini)$">
        Require all denied
    </Files>

    <Files .htaccess>
        Require all denied
    </Files>

</VirtualHost>
```
