import axios from "axios";
import {
    cleanApplication
} from "../utils/dataQuality";


// =====================================================
// AXIOS INSTANCE
// =====================================================

const api = axios.create({

    baseURL: "http://localhost:8080/api",

    headers: {
        "Content-Type": "application/json"
    },

    timeout: 10000
});


// =====================================================
// GET ALL APPLICATIONS
// =====================================================

export async function getAllApplications() {

    const response = await api.get("/applications");

    if (!Array.isArray(response.data)) {
        return [];
    }

    // Apply data-quality cleaning
    return response.data.map(
        cleanApplication
    );
}


// =====================================================
// GET APPLICATION BY ID
// =====================================================

export async function getApplicationById(id) {

    const response = await api.get(
        `/applications/${encodeURIComponent(id)}`
    );

    // Clean single application
    return cleanApplication(response.data);
}


// =====================================================
// CREATE APPLICATION
// =====================================================

export async function createApplication(application) {

    const response = await api.post(
        "/applications",
        application
    );

    // Clean returned application
    return cleanApplication(response.data);
}


// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================

export async function updateStatus(id, status) {

    const response = await api.patch(
        `/applications/${encodeURIComponent(id)}/status`,
        {
            status: status
        }
    );

    // Clean returned application
    return cleanApplication(response.data);
}