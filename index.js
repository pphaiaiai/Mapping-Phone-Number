// require libphonenumber-js
const { parsePhoneNumber, validatePhoneNumberLength } = require('libphonenumber-js');

// function for mapping phone number
async function mapPhoneNumber(phoneNumber) {
    const { phone, country } = phoneNumber;
    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    let mapping = {}

    if (regex.test(phone)) {
        const phoneNumberData = {};
        if (country || phone.startsWith("+")) {
            mapping = parsePhoneNumber(phone, country);
            phoneNumberData.country_code = "+" + mapping?.countryCallingCode;
            phoneNumberData.country_name = mapping?.country;
            const phoneNumberFormatNational = parsePhoneNumber(phone, country).formatNational()
            phoneNumberData.phone = phoneNumberFormatNational;
        } else if (!country && cleanPhone.length >= 9 && cleanPhone.length <= 10 && cleanPhone.startsWith("09") || cleanPhone.startsWith("08") || cleanPhone.startsWith("06")) {
            mapping = parsePhoneNumber(phone, { defaultCountry: "TH" });
            phoneNumberData.country_code = "+" + mapping?.countryCallingCode;
            phoneNumberData.country_name = mapping?.country;
            const phoneNumberFormatNational = parsePhoneNumber(phone, phoneNumberData.country_name).formatNational()
            phoneNumberData.phone = phoneNumberFormatNational;
        } else {
            phoneNumberData.phone = "Invalid phone number";
        }
        console.log("🚀 ~ file: index.js:34 ~ mapPhoneNumber ~ phoneNumberData:", phoneNumberData)
        return phoneNumberData;
    } else {
        console.log("Invalid phone number");
        return "Invalid phone number"
    }
}

mapPhoneNumber({
    phone: "0990152252",
})
mapPhoneNumber({
    phone: "6690152252",
})

mapPhoneNumber({
phone: "+1 264-497-2759",
// country: "AI"
})

mapPhoneNumber({
    phone: "+1 (209) 555-0191",
})

// mapPhoneNumber({
//     phone: "+66991234567",
// })


// mapPhoneNumber({
//     phone: "+86 10 1234 5678",
// })

// mapPhoneNumber({
//     phone: "+528124129668",
//     country: "MX"
// })

// mapPhoneNumber({
//     phone: "+639669917700",
// })
