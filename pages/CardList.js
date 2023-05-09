import React, { useState } from "react";
import styles from "./index.module.css";

const Card = ({ json, onClose, onClick }) => (
  <div className={styles.cardContainer} onClick={() => onClick(json)}>
    <pre>{JSON.stringify(json, null, 2)}</pre>
    <button
      className={styles.closeBtn}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      &times;
    </button>
  </div>
);

const CardList = ({ onCardClose, onClick = () => {} }) => {
  const [cards, setCards] = useState([
    {
      id: 1,
      json: {
        $: {
          CreditLiabilityID: "L744466147",
          BorrowerID: "B1",
          CreditFileID: "BV143479268",
          CreditTradeReferenceID: "CTR17",
          _AccountIdentifier: "5243001020564245",
          _AccountOpenedDate: "2022-07-10",
          _AccountOwnershipType: "Individual",
          _AccountReportedDate: "2023-04-14",
          _AccountStatusType: "Open",
          _AccountType: "Revolving",
          _CreditLimitAmount: "1800",
          _DerogatoryDataIndicator: "N",
          _LastActivityDate: "2023-04-01",
          _MonthlyPaymentAmount: "29",
          _TermsSourceType: "Provided",
          _MonthsReviewedCount: "9",
          _TermsDescription: "29",
          _UnpaidBalanceAmount: "631",
          CreditBusinessType: "Finance",
          CreditLoanType: "CreditCard",
        },
        _CREDITOR: [[Object]],
        _CURRENT_RATING: [[Object]],
        _LATE_COUNT: [[Object]],
        CREDIT_COMMENT: [[Object]],
        CREDIT_REPOSITORY: [[Object]],
      },
    },
    {
      id: 2,
      json: {
        $: {
          CreditLiabilityID: "L744466135",
          BorrowerID: "B1",
          CreditFileID: "BV143479268",
          CreditTradeReferenceID: "CTR1",
          _AccountIdentifier: "92133784000001",
          _AccountOpenedDate: "2008-05-06",
          _AccountOwnershipType: "Individual",
          _AccountReportedDate: "2023-04-30",
          _AccountStatusType: "Open",
          _AccountType: "Open",
          _DerogatoryDataIndicator: "Y",
          _HighCreditAmount: "547",
          _MonthsReviewedCount: "1",
          _PastDueAmount: "547",
          _UnpaidBalanceAmount: "547",
          CreditBusinessType: "UtilitiesAndFuel",
          CreditLoanType: "Collection",
        },
        _CREDITOR: [[Object]],
        _CURRENT_RATING: [[Object]],
        _LATE_COUNT: [[Object]],
        CREDIT_COMMENT: [[Object], [Object]],
        CREDIT_REPOSITORY: [[Object]],
      },
    },
    {
      id: 3,
      json: {
        $: {
          CreditLiabilityID: "L744466155",
          BorrowerID: "B1",
          CreditFileID: "BV143479268",
          CreditTradeReferenceID: "CTR25",
          _AccountIdentifier: "6978005833678455",
          _AccountOpenedDate: "2021-07-12",
          _AccountOwnershipType: "Individual",
          _AccountReportedDate: "2023-04-07",
          _AccountStatusType: "Open",
          _AccountType: "Revolving",
          _CreditLimitAmount: "980",
          _DerogatoryDataIndicator: "N",
          _LastActivityDate: "2023-04-01",
          _MonthlyPaymentAmount: "37",
          _TermsSourceType: "Provided",
          _MonthsReviewedCount: "20",
          _TermsDescription: "37",
          _UnpaidBalanceAmount: "423",
          CreditBusinessType: "Clothing",
          CreditLoanType: "ChargeAccount",
        },
        _CREDITOR: [[Object]],
        _CURRENT_RATING: [[Object]],
        _LATE_COUNT: [[Object]],
        CREDIT_COMMENT: [[Object]],
        CREDIT_REPOSITORY: [[Object]],
      },
    },
  ]);

  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
    if (onCardClose) {
      onCardClose(id);
    }
  };

  return (
    <div className={styles.cardList}>
      {cards.map((card) => (
        <Card
          key={card.id}
          json={card.json}
          onClose={(e) => removeCard(card.id)}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default CardList;
