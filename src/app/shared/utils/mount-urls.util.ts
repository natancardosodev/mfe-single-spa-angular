import { DominioPortaisEnum, UfSeqEnum } from '../enums/portais-sigfacil.enum';

export const env: string = window.location.host
    .replace(/.+\.([\w]{1})\.gov.+/i, '$1')
    .split('.')[0]
    .split('-interno')[0];

export const uf = env.includes('front')
    ? 'al'
    : window.location.host.replace(/.+\.([\w]{2})\.gov.+/i, '$1').split('.')[0];

export const municipio = /\.(.*?)\.gov/.exec(window.location.hostname)
    ? /\.(.*?)\.gov/.exec(window.location.hostname)[1].match(/(.*?)\./)[1]
    : null;

export const ufSeq: number = UfSeqEnum[uf.toUpperCase()];

export const producao = 'www';

export const isProd = [producao, 'gateway', 'legacy', 'interno'].includes(env);

export const getUrlAssets = (type: string) => {
    return env.includes('front')
        ? `https://${env}.wsxtecnologia.com.br/assets-${type}`
        : `https://${isProd ? '' : env + '-'}${type}.staticwsx.com.br`;
};

export const urlAssetsSigfacil = getUrlAssets('sigfacil');

export const urlAssetsSlim = getUrlAssets('slim');

export const urlJarvis = env.includes('front')
    ? `https://${env}.wsxtecnologia.com.br/jarvis`
    : `https://${isProd ? '' : env + '-'}jarvis.wsxtecnologia.com.br`;

export const urlJarvisNew = `https://${isProd ? '' : env + '-'}legacy.${
    DominioPortaisEnum[uf.toUpperCase()]
}/api/jarvis`;

export const urlPortalDocs = `https://${env}.wsxtecnologia.com.br/docs/ui/`;

export const urlPortalHttp = `http://${window.location.host}`;

export const urlPortalHttps = `https://${window.location.host}`;
