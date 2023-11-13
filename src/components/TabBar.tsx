'use client';

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}
export const TabBar = ({currentTab = 1,tabOptions = [1,2,3,4]}:Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);
  const onTabSelected = (tab:number)  => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString());
  }
  return (
    <div className={`grid grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2 mt-4`}>
      {
        tabOptions.map((tab) => (
          <div key={tab}>
            <input type="radio" id={tab.toString()} checked={selected == tab} onChange={() => {}} className="peer hidden" />
            <label onClick={() => onTabSelected(tab)} className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {tab}
            </label>
          </div>
        ))
      }
    </div>
  )
}
