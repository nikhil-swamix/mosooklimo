
Feature List:

ADMIN-PANEL:
	

CUSTOMER:
	FUNCTIONS:
		CHECK:
			- can check booking by using booking id
			- can see driver email , phone , and name only in check booking
		ENQUIRY:
			- can open enquiry via ENQUIRY Base Endpoint
			- can check status of enquiry on their mail. admin will refrence the enquiry id, message in mail and do appropriate conversation with CUSTOMER.

BOOKING:
	SPOT-BOOKING: 
		- will be able to book a trip but cant hold the taxi
	RESERVATION-BOOKING: 
		- can hold taxi , will be charged /day and /km
		- suggestion: /day charge will be very unattractive to customer, as they will overpay for unused hours.


DRIVER:
	ENDPOINT:
		BASE:
			www.website.com/driver/
		REJECT-ASSIGNMENT:
			GET www.website.com/api/orders/toggleassign/:id (once reject cant undo it, as booking wont displayed to him next time)
		
	FUNCTIONS:
		DASHBOARD:
			- will have all details of booking, pending bookings(auto calculated)
		ENQUIRY:
			- can open enquiry using the default enquiry form (customer will also use the same API),
			bur frontend will forcefully set the usertype=driver.
			- enlist the enquiries opened by him/her and check status.
		BOOKINGS:
			- can check only the bookings assigned by admin to him.
			- driver will make necessary adjustments according to add-ons
			- can see customer email, phone, and name.
			- (not finalized) the booking must be compulsary accepted by driver, if driver cant accept it , 
			open enquiry and/or inform admin directly.
			- if booking completed after trip, then driver can change the state of his booking as "completed".
		ENQUIRY:
			- Dedicated enquiry section in dashboard. 

ENQUIRY:
	ENDPOINT:

		BASE:
			www.website.com/enquiry/

		OPEN-ENQIURY:
			POST www.website.com/api/enquiries/ 
			ARGS = [email,phone,name,category,usertype,message(full detail)]
			ACCESS = DRIVER, CLIENT

		GET-ENQUIRIES:
			GET www.website.com/api/enquiries/ 
			METHOD = use auth-token to get email and filter enq according to email
			ACCESS = ADMIN (all-paginated), DRIVER(respective)

REGISTRATION:
	- input validations for phone, name, email and all fields
	- no duplicate phone/email allowed.
	- use captcha to verify or email the OTP code to verify.
	- rate limiting to 3 registrations per ip/per day to avoid database spamming