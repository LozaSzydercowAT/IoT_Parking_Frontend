import {useState, useEffect} from "react";
import {Outlet, useNavigate, useLocation} from "react-router-dom";
import '../../assets/styles/account.css'
import { Tab, TabList, TabValue, SelectTabData, SelectTabEvent } from "@fluentui/react-components";
import { HistoryFilled, PersonFilled, PersonRegular, WalletCreditCardFilled, NotebookEyeFilled, bundleIcon, WalletCreditCardRegular, HistoryRegular, NotebookEyeRegular } from "@fluentui/react-icons";
import '../../assets/styles/account.css'

function AccountPage() {
    const [selectedTab, setSelectedTab] = useState<TabValue>('account');
    const navigate = useNavigate();
    const location = useLocation();

    const Person = bundleIcon(PersonFilled, PersonRegular);
    const Payment = bundleIcon(WalletCreditCardFilled, WalletCreditCardRegular);
    const History = bundleIcon(HistoryFilled, HistoryRegular);
    const Messages = bundleIcon(NotebookEyeFilled, NotebookEyeRegular);

    const handleTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
        setSelectedTab(data.value);
        let page = '/account';
        if(data.value !== 'account') page +=  '/' + data.value;
        navigate(page, { replace: true });
        console.warn(window.location.pathname)
    }

    useEffect(() => {
        const page = location.pathname;
        const value = (page === '/account') ? 'account' : page.substring('/account/'.length);
        setSelectedTab(value);
    }, [location]);

    return <>
        <TabList size="large" style={{justifyContent: "center", gap: "40px"}} onTabSelect={handleTabSelect} selectedValue={selectedTab}>
            <Tab value="account" icon={<Person />}>Konto</Tab>
            <Tab value="payments" icon={<Payment />}>Płatności</Tab>
            <Tab value="history" icon={<History />}>Historia</Tab>
            <Tab value="messages" icon={<Messages />}>Wiadomości</Tab>
        </TabList>
        <Outlet />
    </>
}

export default AccountPage
