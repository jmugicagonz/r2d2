"use client";

import FormJSON from "../../code_to_copy/app/components/base-ui/FormData";
import Stack from "@mui/material/Stack";

export default function FormTest() {
    const message = { "collectionMemberIds": []
    , "categories": ["TV - VIDEO - SON > TELEVISEUR > TELEVISEUR LED"]
    , "brands": [], "tags": []
    , "fulfillmentInfo": []
    , "images": [{ "uri": "http://i2.cdscdn.com/pdt2/1/1/9/1/700x700/HIS6942147491119.jpg"
    , "height": 0, "width": 0 }]
    , "sizes": []
  
    , "materials": [], "patterns": [], "conditions": [], "variants": [], "promotions": [], "localInventories": []
    , "attributes": { 
        "Poids (Expédition)": { "text": ["16,5 kg"], "numbers": [] }
        , "Dispositifs intégrés": { "text": ["Alexa/VIDAA voice"], "numbers": [] }
        , "Effets sonores": { "text": ["Effet surround"], "numbers": [] }
        , "Connectivité sans fil": { "text": ["Bluetooth"], "numbers": [] }
        , "Type de téléviseur": { "text": ["Smart TV"], "numbers": [] }
        , "Tuner de télévision": { "text": ["DVB-T2/C/S2\nHbbtv"], "numbers": [] }
        , "Couleur principale": { "text": ["Noir"], "numbers": [] }
       , "Taille de diagonale": { "text": ["55\""], "numbers": [] }
      
    , "Caractéristiques": { "text": ["Télécommande à piles\nApplications en accès direct sur la télécommande : Netflix, Youtube, Primé Vidéo, Rakuten.tv, Canal+ et Molotov"], "numbers": [] }
     , "Interface de montage VESA": { "text": ["200 x 400 mm"], "numbers": [] }
    , "Couleur": { "text": ["Noir"], "numbers": [] }
    , "Modes": { "text": ["Mode Cinéma\nMode Sport\nMode Jeu"], "numbers": [] }
    , "Système d'exploitation": { "text": ["Vidaa U6"], "numbers": [] }
     , "Connectivité": { "text": ["Bluetooth\nEthernet (RJ45)"], "numbers": [] }
    , "Diagonale": { "text": ["55\" - 139 cm"], "numbers": [] }
    , "Observations": { "text": ["Dans le cas où une garantie commerciale est proposée par le vendeur, celle-ci ne fait pas obstacle à;l’application de la garantie légale de conformité et/ou à la garantie des vices cachés. Voir;conditions de cette garantie commerciale dans les CGV du vende"], "numbers": [] }
    , "Consommation électrique HDR (mode marche)": { "text": ["120 kWh/1000 h"], "numbers": [] }
    , "Formats audio pris en charge": { "text": [".wav/.FLAC/.MP2/.MP3 music (mp3 aac wma wav)"], "numbers": [] }
    , "Interface vidéo": { "text": ["USB, HDMI"], "numbers": [] }
    
    , "Compatible avec Assistant Intelligent": { "text": ["Alexa / VIDAA Voice"], "numbers": [] }
    , "Classe énergétique": { "text": ["G"], "numbers": [] }, "Interfaces": { "text": ["USB\nHDMI"], "numbers": [] }
    , "Largeur (emballée)": { "text": ["1400 mm"], "numbers": [] }, "Largeur": { "text": ["1233 mm"], "numbers": [] }
    , "Temps de réponse": { "text": ["Input lag en Mode Jeu : 6 ms"], "numbers": [] }
    , "Egaliseur": { "text": ["Oui (Paramètres avancés)"], "numbers": [] }
    , "Livré avec": { "text": ["Télécommande vocale ERF2L36H avec 2 piles AAA"], "numbers": [] }
    , "Consommation Classe énergétique": { "text": ["Classe G"], "numbers": [] }
    , "Formats d'images pris en charge": { "text": [".jpeg/.bmp/.PNG/.GIF"], "numbers": [] }
    , "Type de produit": { "text": ["Smart TV"], "numbers": [] }, "Diagonale d'écran (cm)": { "text": ["139"], "numbers": [] }
    , "Résolution": { "text": ["Ultra HD (3840 x 2160)"], "numbers": [] }
    , "Poids": { "text": ["Avec pieds : 11 kg\nSans pieds : 10,9 kg"], "numbers": [] }
    , "Marque": { "text": ["HISENSE"], "numbers": [] }
    , "Type d'affichage": { "text": ["Direct LED"], "numbers": [] }
    , "Dimensions & Poids": { "text": ["Avec pieds : L1233 x P135 x H846 mm / 11 kg\nSans pieds : L1233 x P80 x H715 mm / 10,9 kg"], "numbers": [] }
    , "Verrouillage de chaines par les parents": { "text": ["Oui"], "numbers": [] }, "Télévision|Classe de diagonale": { "text": ["55 po"], "numbers": [] }
    , "Antenne": { "text": ["Prises antennes : 2"], "numbers": [] }, "Mode de sortie audio": { "text": ["S/PDIF : 1 (optique)"], "numbers": [] }
    , "Port USB": { "text": ["2"], "numbers": [] }, "Taille d'écran": { "text": ["55\" - 139 cm"], "numbers": [] }
    , "Indice de réparabilité": { "text": ["6,1"], "numbers": [] }, "Haut-parleur(s)": { "text": ["2 x 8 W"], "numbers": [] }
    , "Qté de ports HDMI": { "text": ["3"], "numbers": [] }, "Formats vidéo pris en charge": { "text": [".avi/.mp4/.mov/.mkv/.mpg/.vob/.flv/.webm/.ogm"], "numbers": [] }
    , "Hauteur": { "text": ["Avec les pieds : 767 mm\nSans les pieds : 715 mm"], "numbers": [] }, "Tuner TV numérique": { "text": ["DVB-T2/C/S2, Certification Fransat, Common Interface (CI+), Hbbtv"], "numbers": [] }
    , "Télévision|Nombre de ports HDMI": { "text": ["3"], "numbers": [] }, "Design": { "text": ["Finesse du cadre : Sans bord\nFinition : Brossé - Noir\nDouble pieds"], "numbers": [] }
    , "Classe énergétique (HDR)": { "text": ["G"], "numbers": [] }, "Taille de la diagonale": { "text": ["139 cm"], "numbers": [] }
    , "Accessoires inclus": { "text": ["Télécommande vocale ERF2L36H avec 2 piles AAA"], "numbers": [] }
    , "Télévision|TV intelligente": { "text": ["Smart TV"], "numbers": [] }
    , "Dimensions & Poids - Détails": { "text": ["Avec pieds : L1233 x P274 x H767 mm\nSans pieds : L1233 x P80 x H715 mm\nAvec pieds : 11 kg\nSans pieds : 10,9 kg"], "numbers": [] }
    , "Télévision|Compatible HDR": { "text": ["Oui"], "numbers": [] }
    , "Alimentation": { "text": ["Electrique"], "numbers": [] }
    , "Notes": { "text": ["Prise casque : 1\nPrises antennes : 2\nPartage d'écran : Oui (PC, Tablette, Mobile)"], "numbers": [] }
    , "Format d'affichage": { "text": ["4K Ultra HD"], "numbers": [] }, "Résolutions d'affichage prises en charge": { "text": ["Ultra HD (3840 x 2160)"], "numbers": [] }
    , "Pied": { "text": ["Double pieds\nEcartement : 973 mm"], "numbers": [] }, "Décodeurs intégrés": { "text": ["Dolby Audio"], "numbers": [] }
    , "Assistant intelligent": { "text": ["Alexa / VIDAA Voice"], "numbers": [] }, "Classe d'efficacité énergétique": { "text": ["G"], "numbers": [] }
    , "Fonctionnalités": { "text": ["Mode Hôtel"], "numbers": [] }, "Fonctions": { "text": ["Assistant vocal Alexa/VIDAA Voice, Contrôle vocal via télécommande, Smart TV"], "numbers": [] }
    , "DLNA": { "text": ["Partage de contenus (DLNA)"], "numbers": [] }, "TV numérique": { "text": ["DVB - T2/C/S2, Certification Fransat, Common Interface (CI+), Hbbtv"], "numbers": [] }
    , "Grand écran": { "text": ["Oui"], "numbers": [] }, "Fourni avec": { "text": ["Télécommande vocale ERF2L36H avec 2 piles AAA"], "numbers": [] }, "Voix contrôlée": { "text": ["Alexa / VIDAA Voice"], "numbers": [] }
    , "Dimensions (LxPxH)": { "text": ["Avec pieds : 1233 x 274 x 767 mm\nSans pieds : 1233 x 80 x 715 mm"], "numbers": [] }
    , "VESA Mounting Interface": { "text": ["200 x 400 mm"], "numbers": [] }
    , "Interface PC": { "text": ["3x HDMI dont 1 HDMI compatible ARC/eARC"], "numbers": [] }
    , "Modèle de télécommande": { "text": ["ERF2L36H"], "numbers": [] }
    , "Consommation d'énergie SDR (mode On)": { "text": ["84 kWh/1000 h"], "numbers": [] }
    , "Haut-parleurs": { "text": ["2x 8W"], "numbers": [] }
    , "Technologie": { "text": ["Technologie d'affichage : Direct LED"], "numbers": [] }
    , "Protection": { "text": ["Contrôle Parental"], "numbers": [] }
    , "Profondeur": { "text": ["Avec les pieds : 274 mm\nSans les pieds : 80 mm"], "numbers": [] }
    , "Résolution native": { "text": ["Ultra HD (3840 x 2160)"], "numbers": [] }
    , "Profondeur (emballée)": { "text": ["135 mm"], "numbers": [] }, "Hauteur (Expédition)": { "text": ["846 mm"], "numbers": [] }
    , "Commandes audio": { "text": ["Alexa / VIDAA voice"], "numbers": [] }
    , "Garantie (²)": { "text": ["2 ans"], "numbers": [] }
    , "Signaux d'entrée vidéo analogique": { "text": ["HDMI - HDMI eARC/ARC"], "numbers": [] }
    , "Tension requise": { "text": ["100 - 240 V / 50 Hz"], "numbers": [] }
    , "Compatible HDR": { "text": ["Dolby Vision, HDR10+(decoding), HDR10, HLG"], "numbers": [] }
    , "Haut-parleurs inclus": { "text": ["Oui"], "numbers": [] } 
    
    }
    , "name": "projects/316976705640/locations/global/catalogs/default_catalog/branches/1/products/HIS6942147491119", "id": "HIS6942147491119", "type": "PRIMARY", "primaryProductId": "HIS6942147491119", "gtin": "6942147491119", "title": "TV LED HISENSE - 55A6BG - 55'' (139,7CM) - UHD 4K - DOLBY VISION - SMART TV - 3 x HDMI", "description": "HISENSE - 55A6BG - TV LED - UHD 4K -  55'' (139;7CM) - SMART TV - DOLBY VISION - DTS VIRTUAL:X TM - ÉCRAN SANS BORD. ", "languageCode": "", "priceInfo": { "currencyCode": "", "price": 0, "originalPrice": 0, "cost": 0, "priceEffectiveTime": null, "priceExpireTime": null, "priceRange": { "price": null, "originalPrice": null } }, "rating": null, "availableTime": null, "availability": "IN_STOCK", "availableQuantity": null, "uri": "", "audience": { "genders": [], "ageGroups": [] }, "colorInfo": { "colorFamilies": ["Mixed"], "colors": [] }, "retrievableFields": { "paths": ["availability", "uri", "attributes.categories", "brands", "discount", "title", "gtin", "categories", "price_info.original_price", "sizes", "rating.average_rating", "materials", "conditions", "productId", "audience.genders", "audience.age_groups", "color_info.colors", "description", "price_info.cost", "images", "attributes.sponsored_product", "color_info.color_families", "price_info.currency_code"] }, "publishTime": null }

    return (
        <>
            <Stack direction={"column"} margin={10} sx={{ textAlign: 'left' }} >
                <FormJSON data={message} edit={false} />
            </Stack>
        </>
    );
}

