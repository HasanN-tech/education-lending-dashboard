package com.hasan.config;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.hasan.entity.Application;
import com.hasan.repository.ApplicationRepository;
import com.opencsv.CSVReader;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CsvDataLoader implements CommandLineRunner {

	private final ApplicationRepository applicationRepository;

	private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@Override
	public void run(String... args) throws Exception {

		System.out.println("=================================");
		System.out.println("CSV DATABASE LOADER STARTED");
		System.out.println("=================================");

		loadApplications();

		System.out.println("=================================");
		System.out.println("CSV DATABASE LOADER FINISHED");
		System.out.println("=================================");
	}

	private void loadApplications() throws Exception {

		ClassPathResource resource = new ClassPathResource("data/education_loan_applications.csv");

		if (!resource.exists()) {

			System.out.println("CSV file not found!");

			return;
		}

		try (CSVReader reader = new CSVReader(new InputStreamReader(resource.getInputStream()))) {

			// Read header
			String[] header = reader.readNext();

			if (header == null) {

				System.out.println("CSV file is empty!");

				return;
			}

			String[] row;

			int loaded = 0;
			int skipped = 0;

			while ((row = reader.readNext()) != null) {

				try {

					// Prevent duplicate records
					String applicationId = clean(row[0]);

					if (applicationRepository.existsByApplicationId(applicationId)) {

						skipped++;

						continue;
					}

					Application application = new Application();

					// 1. Application ID
					application.setApplicationId(applicationId);

					// 2. Student Name
					application.setStudentName(clean(row[1]));

					// 3. Age
					application.setAge(parseInteger(row[2]));

					// 4. Student State
					application.setStudentState(clean(row[3]));

					// 5. Institution ID
					application.setInstitutionId(clean(row[4]));

					// 6. Institution Name
					application.setInstitutionName(clean(row[5]));

					// 7. Course ID
					application.setCourseId(clean(row[6]));

					// 8. Course Name
					application.setCourseName(clean(row[7]));

					// 9. Course Domain
					application.setCourseDomain(clean(row[8]));

					// 10. Course Fee
					application.setCourseFeeInr(parseDecimal(row[9]));

					// 11. Loan Amount
					application.setLoanAmountRequestedInr(parseDecimal(row[10]));

					// 12. Parent Monthly Income
					application.setParentMonthlyIncomeInr(parseDecimal(row[11]));

					// 13. Existing Obligations
					application.setExistingMonthlyObligationsInr(parseDecimal(row[12]));

					// 14. Credit Score
					application.setCreditScore(parseDecimal(row[13]));

					// 15. Employment Type
					application.setEmploymentType(clean(row[14]));

					// 16. Application Date
					application.setApplicationDate(parseDate(row[15]));

					// 17. Application Status
					application.setApplicationStatus(cleanStatus(row[16]));

					// 18. Application Channel
					application.setApplicationChannel(clean(row[17]));

					applicationRepository.save(application);

					loaded++;

				} catch (Exception e) {

					skipped++;

					System.out.println("Skipped invalid row: " + e.getMessage());
				}
			}

			System.out.println("Records loaded: " + loaded);

			System.out.println("Records skipped: " + skipped);
		}
	}

	private String clean(String value) {

		if (value == null) {
			return null;
		}

		value = value.trim();

		if (value.isEmpty()) {
			return null;
		}

		return value;
	}

	private String cleanStatus(String status) {

		status = clean(status);

		if (status == null) {
			return "Unknown";
		}

		// Handle known typo
		if (status.equalsIgnoreCase("Aproved")) {
			return "Approved";
		}

		// Normalize whitespace/case
		if (status.equalsIgnoreCase("Under Review")) {
			return "Under Review";
		}

		if (status.equalsIgnoreCase("Approved")) {
			return "Approved";
		}

		if (status.equalsIgnoreCase("Rejected")) {
			return "Rejected";
		}

		if (status.equalsIgnoreCase("Submitted")) {
			return "Submitted";
		}

		return status;
	}

	private Integer parseInteger(String value) {

		value = clean(value);

		if (value == null) {
			return null;
		}

		return Integer.parseInt(value);
	}

	private BigDecimal parseDecimal(String value) {

		value = clean(value);

		if (value == null) {
			return null;
		}

		return new BigDecimal(value);
	}

	private LocalDate parseDate(String value) {

		value = clean(value);

		if (value == null) {
			return null;
		}

		return LocalDate.parse(value, DATE_FORMAT);
	}
}