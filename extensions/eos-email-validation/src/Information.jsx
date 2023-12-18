import {
    reactExtension,
    TextField,
    BlockLayout,
    Text,
    useApplyMetafieldsChange,
    useMetafield,
  } from "@shopify/ui-extensions-react/checkout";
  import React, { useState, useEffect } from "react";
  
  export default reactExtension("Checkout::Dynamic::Render", () => <Extension />);
  
  function Extension() {
    const [vatNumber, setVatNumber] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [showCustError, setShowCustError] = useState(false);
    const [isValidVat, setIsValidVat] = useState(false);
    const [isValidCust, setIsValidCust] = useState(false);
    const [showError, setShowError] = useState(false);
  
    const metafieldNamespace = "custom";
    const metafieldKey = "vat_number";
    // Get a reference to the metafield
    const VAtInstructions = useMetafield({
      namespace: metafieldNamespace,
      key: metafieldKey,
    });
  
    // Define the metafield namespace and key
    const metafieldNamespaceCust = "custom";
    const metafieldKeyCust = "customer_id";
    // Get a reference to the metafield
    const CustInstructions = useMetafield({
      namespace: metafieldNamespaceCust,
      key: metafieldKeyCust,
    });
    // Set a function to handle updating a metafield
    const applyMetafieldsChange = useApplyMetafieldsChange();
  
    const handleCustomerIdChange = () => {
      const inputValue = customerId;
      // Validate by ReGEX for Mobile Number
      const regex = /^[0-9\b]+$/;
      setIsValidCust(regex.test(inputValue));
      if (inputValue === "" || regex.test(inputValue) === true) {
        setShowCustError(false);
      } else {
        setShowCustError(true);
      }
    };
  
    const Custerror = "Enter Number";
  
    const handleVatNumberChange = () => {
      const inputValueNO = vatNumber;
      // Check if the input matches the alphanumeric pattern
      const regex = /^[a-zA-Z0-9\s]+$/;
      setIsValidVat(regex.test(inputValueNO));
      if (inputValueNO === "" || regex.test(inputValueNO) === true) {
        setShowError(false);
      } else {
        setShowError(true);
      }
    };
  
    const VATerror = "Enter valid VAT Number.";
  
    return (
      <BlockLayout spacing="base">
        <TextField
          label="Customer ID (Optional)"
          onChange={(value) => {
            // Apply the change to the metafield
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespaceCust,
              key: metafieldKeyCust,
              valueType: "string",
              value,
            });
            setCustomerId(value);
          }}
          onBlur={() => {
            handleCustomerIdChange();
          }}
          value={CustInstructions?.value}
          error={showCustError === true ? Custerror : showCustError}
        />
  
        <TextField
          label="VAT Number"
          maxLength="9"
          minLength="20"
          onChange={(value) => {
            // Apply the change to the metafield
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespace,
              key: metafieldKey,
              valueType: "string",
              value,
            });
            setVatNumber(value);
          }}
          onBlur={() => {
            handleVatNumberChange();
          }}
          value={VAtInstructions?.value}
          error={showError === true ? VATerror : showError}
          required
        />
      </BlockLayout>
    );
  }