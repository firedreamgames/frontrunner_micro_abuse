function utc_Now()
{
	 var now = new Date;
 var utc_now = now.getTime() + now.getTimezoneOffset() * 60000;//convert now to UTC since post date is in UTC
	return (utc_now)
}