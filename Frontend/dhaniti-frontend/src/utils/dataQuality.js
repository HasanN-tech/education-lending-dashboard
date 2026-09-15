// =====================================================
// Dhaniti Fintech - Data Quality Utilities
// =====================================================


// =====================================================
// 1. CLEAN STRING VALUES
// =====================================================

export const cleanString = (value) => {

    // Handle null / undefined
    if (value === null || value === undefined) {
        return null;
    }

    // Convert to string and remove leading/trailing spaces
    const cleanedValue = String(value).trim();

    // Empty string should be treated as missing
    if (cleanedValue === "") {
        return null;
    }

    return cleanedValue;
};


// =====================================================
// 2. CLEAN APPLICATION STATUS
// =====================================================

export const cleanStatus = (status) => {

    const value = cleanString(status);

    // Missing status
    if (!value) {
        return "Unknown";
    }

    const normalized = value.toLowerCase();


    // Approved
    if (normalized === "approved") {
        return "Approved";
    }


    // Rejected
    if (normalized === "rejected") {
        return "Rejected";
    }


    // Under Review
    if (
        normalized === "under review" ||
        normalized === "under revieew"
    ) {
        return "Under Review";
    }


    // Submitted
    if (normalized === "submitted") {
        return "Submitted";
    }


    // Return original cleaned value
    return value;
};


// =====================================================
// 3. DISPLAY MISSING VALUES
// =====================================================

export const displayValue = (value) => {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "Not Available";
    }

    return value;
};


// =====================================================
// 4. CLEAN NUMERIC VALUES
// =====================================================

export const cleanNumber = (value) => {

    // Missing value
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const number = Number(value);

    // Invalid number
    if (Number.isNaN(number)) {
        return null;
    }

    return number;
};


// =====================================================
// 5. CLEAN COMPLETE APPLICATION
// =====================================================

export const cleanApplication = (application) => {

    return {

        ...application,

        // ---------------------------------------------
        // Application information
        // ---------------------------------------------

        applicationId:
            cleanString(application.applicationId),

        studentName:
            cleanString(application.studentName),

        age:
            cleanNumber(application.age),

        studentState:
            cleanString(application.studentState),


        // ---------------------------------------------
        // Institution information
        // ---------------------------------------------

        institutionId:
            cleanString(application.institutionId),

        institutionName:
            cleanString(application.institutionName),


        // ---------------------------------------------
        // Course information
        // ---------------------------------------------

        courseId:
            cleanString(application.courseId),

        courseName:
            cleanString(application.courseName),

        courseDomain:
            cleanString(application.courseDomain),


        // ---------------------------------------------
        // Financial information
        // ---------------------------------------------

        courseFeeInr:
            cleanNumber(application.courseFeeInr),

        loanAmountRequestedInr:
            cleanNumber(
                application.loanAmountRequestedInr
            ),

        parentMonthlyIncomeInr:
            cleanNumber(
                application.parentMonthlyIncomeInr
            ),

        existingMonthlyObligationsInr:
            cleanNumber(
                application.existingMonthlyObligationsInr
            ),


        // ---------------------------------------------
        // Credit score
        // ---------------------------------------------

        creditScore:
            cleanNumber(application.creditScore),


        // ---------------------------------------------
        // Other information
        // ---------------------------------------------

        employmentType:
            cleanString(application.employmentType),

        applicationDate:
            cleanString(application.applicationDate),

        applicationStatus:
            cleanStatus(application.applicationStatus),

        applicationChannel:
            cleanString(application.applicationChannel)
    };
};


// =====================================================
// 6. CHECK WHETHER A VALUE IS MISSING
// =====================================================

export const isMissing = (value) => {

    return (
        value === null ||
        value === undefined ||
        value === ""
    );
};


// =====================================================
// 7. CHECK CREDIT SCORE
// =====================================================

export const isValidCreditScore = (creditScore) => {

    if (isMissing(creditScore)) {
        return false;
    }

    const score = Number(creditScore);

    return (
        !Number.isNaN(score) &&
        score >= 300 &&
        score <= 900
    );
};


// =====================================================
// 8. GET DATA QUALITY INFORMATION FOR ONE RECORD
// =====================================================

export const getDataQualityIssues = (application) => {

    const issues = [];


    // ---------------------------------------------
    // Missing credit score
    // ---------------------------------------------

    if (isMissing(application.creditScore)) {

        issues.push("Missing credit score");
    }


    // ---------------------------------------------
    // Invalid credit score
    // ---------------------------------------------

    else if (!isValidCreditScore(application.creditScore)) {

        issues.push("Unusual credit score");
    }


    // ---------------------------------------------
    // Missing student name
    // ---------------------------------------------

    if (isMissing(application.studentName)) {

        issues.push("Missing student name");
    }


    // ---------------------------------------------
    // Missing application status
    // ---------------------------------------------

    if (isMissing(application.applicationStatus)) {

        issues.push("Missing application status");
    }


    // ---------------------------------------------
    // Missing institution
    // ---------------------------------------------

    if (isMissing(application.institutionName)) {

        issues.push("Missing institution");
    }


    // ---------------------------------------------
    // Missing course
    // ---------------------------------------------

    if (isMissing(application.courseName)) {

        issues.push("Missing course");
    }


    return issues;
};


// =====================================================
// 9. CHECK WHETHER APPLICATION HAS DATA QUALITY ISSUES
// =====================================================

export const hasDataQualityIssues = (application) => {

    return getDataQualityIssues(application).length > 0;
};