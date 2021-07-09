import React from 'react';
import {defaultThemes} from 'react-data-table-component';

export const Constant = {
    blogID: 1,
    testimonialID: 2,
    faqID: 3,
    glossaireID: 4,
    publicationID: 5,
    jobOfferID: 9999,
    othersDomaineID: 1,
    toastDelay: 2000,
    postPageLimit: 5,
    glossaryPageLimit: 15,
    blogPageLimit: 10,
    contratType: [
        "contrat_type.cdi",
        "contrat_type.cdd",
        "contrat_type.interim",
    ],
    userRole: "Simple User",
    adminRole: "User RH",
    SuperadminRole: "Super Admin",
    notificationLimit: 4,
    orangeColor: {
        greyscale: [
            '#cd3c14',
            '#ff7900',
            '#f16e00',
            '#527edb',
            '#a885d8',
            '#ffb4e6',
            '#ffd200',
            '#32c832',
            '#50be87',
            '#4bb4e6',
        ],
        palette: [
            '#fff',
            '#fafafa',
            '#f6f6f6',
            '#eee',
            '#ddd',
            '#ccc',
            '#999',
            '#666',
            '#595959',
            '#333'
        ],
        full: [
            '#E6B8AF',
            '#F4CCCC',
            '#FCE5CD',
            '#FFF2CC',
            '#D9EAD3',
            '#D0E0E3',
            '#C9DAF8',
            '#CFE2F3',
            '#D9D2E9',
            '#EAD1DC',
            '#DD7E6B',
            '#EA9999',
            '#F9CB9C',
            '#FFE599',
            '#B6D7A8',
            '#A2C4C9',
            '#A4C2F4',
            '#9FC5E8',
            '#B4A7D6',
            '#D5A6BD',
            '#CC4125',
            '#E06666',
            '#F6B26B',
            '#FFD966',
            '#93C47D',
            '#76A5AF',
            '#6D9EEB',
            '#6FA8DC',
            '#8E7CC3',
            '#C27BA0',
            '#A61C00',
            '#CC0000',
            '#E69138',
            '#F1C232',
            '#6AA84F',
            '#45818E',
            '#3C78D8',
            '#3D85C6',
            '#674EA7',
            '#A64D79',
            '#85200C',
            '#990000',
            '#B45F06',
            '#BF9000',
            '#38761D',
            '#134F5C',
            '#1155CC',
            '#0B5394',
            '#351C75',
            '#733554',
            '#5B0F00',
            '#660000',
            '#783F04',
            '#7F6000',
            '#274E13',
            '#0C343D',
            '#1C4587',
            '#073763',
            '#20124D',
            '#4C1130'
        ]
    },
    tableCustomStyles: {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headCells: {
            style: {
                minHeight: '56px',
                fontSize: '1rem',
                fontWeight: "bold",
                padding: '.875rem .625rem calc(.875rem + 1px)',
                lineHeight: "1.25",
                verticalAlign: "top",
                paddingLeft: '8px',
                paddingRight: '8px',
            },
        },
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize: ".9rem"
            }
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    },
    applicationRh:{
        myInfos:{
            title:"My infos",
            url:"https://sirh-prod-app.adcm.orangecm:4443/",
        },
         taleo:{
            title:"Taleo",
            url:"https://aa135.taleo.net/",
        },

       e_learning: {
            title:"E-learning ",
            url:"http://learning.orange.com/",
        },

        livretAcueil:{
            title:"Livret d’accueil",
            url:"/under-construction",
        },

        fusion:{
            title:"Fusion",
            url:"https://login-hdtd-saasfaprod1.fa.ocs.oraclecloud.com/oam/server/obrareq.cgi?encquery%3DDXsGydWSucQMTw5k1%2FZEDa6DmAqB%2BFTlHk2fdrBcD3VxIS%2BMKVdpQyOngM8e3OYaV3GqEjdcJUjAGVp40bSEU%2BaJYMUTt7ouHO2INiA7Q4EYW%2B1ZIHtsUushp%2BBTWBhbDn87DkYhMLnPb2PFZ0eil%2FpuoCVBpNkhBsKiOCicpt2azm3%2B7SplP3wZ2CYljJY6kTXHC1uT58qQxhINLtiL7%2B7%2Br5SrpZ%2B2lNkgneZcJ2n6AaqXsIizlSdSTwWjpr5%2BUJDPcRxhBDOD138XhGH6ooGsqUdLIW8HbeQwe%2BLS8sFT49%2FtQJ4%2FsHHxyXXZn0EIn5t47vjVE2DbGZNGHCUDMV1Bv3UkQNNLR3gJjq%2F27bQWPyQEu9PMfUkkK8XEuqVAMCUaGERgob0qPNyG7R8lusqoIxCvBp3CWyHzoY54FBBJwvsGF2z%2B5eVxnkvymC32c8r6QzRYVk8mR0UkqKVI1Rk15lCSNGC5E9XjkeZbRMFuh6SaNLpJs8fb%2FXoODPu5BBsMIZP%2BRn1q0sDY2AaFQQ%3D%3D%20agentid%3DOraFusionApp_11AG%20ver%3D1%20crmethod%3D2%26cksum%3D841aa419a9a4ce276b89909482ec1d3a047d1341&ECID-Context=1.005ky0RtbUx7EC5pvOc9yX0002Mn0002mR%3BkXjE",
        }

}
    
}
