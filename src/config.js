export const config = {
    endpoints: {
        getCommunes: `${process.env.VUE_APP_PHARMACIES_API_BASE_URL}/communes`,
        getOnDutyPharmacies: `${process.env.VUE_APP_PHARMACIES_API_BASE_URL}/pharmacies/on-duty`,
    },
};