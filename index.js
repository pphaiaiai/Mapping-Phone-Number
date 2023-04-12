// require libphonenumber-js
const { parsePhoneNumber } = require('libphonenumber-js');

// function for mapping phone number
async function mapPhoneNumber(phoneNumber) {
    const { phone, country } = phoneNumber;
    const number = phone.replaceAll(/\s/g, '').replaceAll(/[-]/g, '').replaceAll(/[()]/g, '');
    console.log("🚀 ~ file: index.js:8 ~ mapPhoneNumber ~ number:", number)
    console.log("🚀 ~ file: index.js:8 ~ mapPhoneNumber ~ number:", number.replaceAll(/[+]/g, '').length )
    const regex = /^[\+]?[0-9]{7,12}$/
    // const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,16}$/
    let mapping = {}

    if (regex.test(number)) {
    const cleanedPhone = phone.replace(/[^0-9]/g, "");
    const phoneNumberData = {};
    if (country || phone.startsWith("+")) {
        mapping = parsePhoneNumber(phone, country);
        phoneNumberData.country_code = "+" + mapping?.countryCallingCode;
        phoneNumberData.country_name = mapping?.country;
        const phoneNumberFormatNational = parsePhoneNumber(phone, country).formatNational()
        phoneNumberData.phone = phoneNumberFormatNational.replaceAll(/\s/g, '').replaceAll(/[-]/g, '');

    } else if (!country && !phone.startsWith("+") && !phone.startsWith("0")) {
        phoneIncludeCountyCode = "+" + cleanedPhone;
        try {
            mapping = parsePhoneNumber(phoneIncludeCountyCode);
        } catch (error) {
            mapping = undefined
        }
        if (mapping) {
            phoneNumberData.country_code = "+" + mapping?.countryCallingCode;
            phoneNumberData.country_name = mapping?.country;
            const phoneNumberFormatNational = parsePhoneNumber(phoneIncludeCountyCode).formatNational()
            phoneNumberData.phone = phoneNumberFormatNational.replaceAll(/\s/g, '').replaceAll(/[-]/g, '');
        } else {
            phoneNumberData.phone = cleanedPhone
            phoneNumberData.country_code = undefined
            phoneNumberData.country_name = undefined
        }

    } else {
        phoneNumberData.phone = cleanedPhone
        phoneNumberData.country_code = undefined
        phoneNumberData.country_name = undefined
    }
    console.log("🚀 ~ file: index.js:34 ~ mapPhoneNumber ~ phoneNumberData:", phoneNumberData )
    console.log("\n");
    return phoneNumberData;
    } else {
        console.log("Invalid phone number : " + number + "\n");
        return "Invalid phone number"
    }
}

mapPhoneNumber({
    phone: "+1    212--555-0123",
})
mapPhoneNumber({
    phone: "+44 20 7123 4567",
})
mapPhoneNumber({
    phone: "+81 3-1234-5678",
})
mapPhoneNumber({
    phone: "+66 2 123 4567",
})
mapPhoneNumber({
    phone: "+91 11 2345 6789",
})
mapPhoneNumber({
    phone: "+33 1 23 45 67 89",
})
mapPhoneNumber({
    phone: "+49 30 12345678",
})
mapPhoneNumber({
    phone: "+61 2 1234 5678",
})
mapPhoneNumber({
    phone: "+1 416-555-0123",
})
mapPhoneNumber({
    phone: "+34 91 123 45 67",
})
mapPhoneNumber({
    phone: "+39 06 1234 5678",
})
mapPhoneNumber({
    phone: "+60 3-1234 5678",
})
mapPhoneNumber({
    phone: "+82 2-1234-5678",
})
mapPhoneNumber({
    phone: "+43 1 2345678",
})
mapPhoneNumber({
    phone: "+46 8 123 456 78",
})
mapPhoneNumber({
    phone: "+47 22 12 34 56",
})
mapPhoneNumber({
    phone: "+90 212 123 45 67",
})
mapPhoneNumber({
    phone: "+54 11 1234-5678",
})

mapPhoneNumber({
    phone: "66990152252",
})
mapPhoneNumber({
    phone: "0990152252",
})

mapPhoneNumber({
phone: "1 (264)-497-2759",
country: "AI"
})

mapPhoneNumber({
    phone: "  1209 5550  191",
})

mapPhoneNumber({
    phone: "+528124129668",
    country: "MX"
})
mapPhoneNumber({
    phone: "52 812412",
})