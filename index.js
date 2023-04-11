// require libphonenumber-js
const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');

// function for mapping phone number
async function mapPhoneNumber(phoneNumber) {
    const { phone, country } = phoneNumber;

    if (isValidPhoneNumber(phone)) {
        const mapping = parsePhoneNumber(phone);
        const phoneNumberData = {};
        if (mapping) {
            phoneNumberData.country_code = "+" + mapping?.countryCallingCode;
            phoneNumberData.country_name = mapping?.country;
            const phoneNumberFormatNational = parsePhoneNumber(phone, country).formatNational()
            phoneNumberData.phone = phoneNumberFormatNational;
            console.log("🚀 ~ file: index.js:14 ~ mapPhoneNumber ~ phoneNumberData:", phoneNumberData)
        } else {
            const mapping = parsePhoneNumber(phone, country);
            phoneNumberData.country_code = "+" + mapping?.countryCallingCode;
            phoneNumberData.country_name = mapping?.country;
            const phoneNumberFormatNational = parsePhoneNumber(phone, country).formatNational()
            phoneNumberData.phone = phoneNumberFormatNational;
            console.log("🚀 ~ file: index.js:19 ~ mapPhoneNumber ~ phoneNumberData:", phoneNumberData)
        }
        return phoneNumberData;
    }
}

// mapPhoneNumber({
//     phone: "+6699-123-4567",
//     country: "TH"
// })

mapPhoneNumber({
    phone: "+86 10 1234 5678",
    country: "CN"
})

