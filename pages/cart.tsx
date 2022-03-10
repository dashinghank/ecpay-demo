import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { parse, ParsedUrlQuery } from "querystring";
import ecpay from "../utils/ecpay";
const Cart: NextPage = (props: any) => {
  const router = useRouter();
  // console.log("props.order:", props.order);
  let order = props.result.order ?? {};

  console.log("order:", order);
  return (
    <div className="container">
      <button
        onClick={async () => {
          router.push({
            pathname: "/redirect",
            query: { value: "map" },
          });
          // router.p
        }}
      >
        選擇門市
      </button>

      <div>超商門市:{order.TempLogisticsID ?? "無選擇"}</div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let result: any = {};
  switch (context.query.from) {
    case "map":
      let res: any = await ecpay.getFormData(context);
      let resultData = JSON.parse(res.ResultData);
      let lockedData = resultData.Data;
      let key = "XBERn1YOvpM9nfZc";
      let iv = "h1ONHk4P4yqbl5LK";
      let order = ecpay.aesDecode(key, iv, lockedData);
      result["order"] = order;
      break;
    default:
      break;
  }

  return { props: { result } };
}

export default Cart;
