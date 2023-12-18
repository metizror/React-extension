import React, { useState, useEffect } from "react";
import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useEmail,
  Text,
  useShippingAddress,
  useBillingAddress,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.contact.render-after',
  () => <Extension />,
);

function Extension() {
  // Use i18n provided by the extension API
  const { i18n } = useApi();
  const translate = useTranslate();
  const { extension } = useApi();
  const emailid = useEmail();
  const [error, setError] = useState("");
  const mails = ["@gmail", "@hotmail", "@yahoo", "@mac", "@aol"];


  const code = useShippingAddress();
   const country = useBillingAddress();
  const validateEmail = () => {
    if (emailid) {
      const isValid = mails.some((domain) => emailid && emailid.includes(domain));
      if (isValid) {
        // if(code.countryCode === "DE" || country.countryCode === "DE"){
          setError(
            translate('welcome')
            // "Bitte beachten Sie, dass wir nur an Geschäftskunden verkaufen können. Wenn Sie kein Unternehmen sind, können wir die Schlussrechnung nicht bearbeiten und Ihre Bestellung wird abgelehnt."
          );
        // }
        // else{
        //   setError(
        //     translate('welcome')
        //     // "Please be aware that we can only sell to business customers. If you are not a business, we cannot process the final invoice, and your order will be rejected."
        //     )
        // }
      } else {
        setError("");
      }
    } else {
      // Handle the case where emailid is undefined (e.g., display an error message).

    }
  };
  useEffect(() => {
    validateEmail();
  }, [emailid]);
// console.log(error)
  return (<>
  {/* <Banner>
      {translate('welcome')}
    </Banner> */}
  {error && <Banner>{error}</Banner>}
  </>);
}