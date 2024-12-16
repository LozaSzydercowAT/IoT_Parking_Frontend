import {useState, useEffect, memo} from "react";
import axios from "../../../axiosConfig";
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogTitle, DialogTrigger, LargeTitle, MessageBar, MessageBarActions, MessageBarBody, MessageBarGroup, MessageBarTitle } from "@fluentui/react-components";
import MessageData from "../../interfaces/MessageData";
import Loader from "../shared/Loader";
import "../../assets/styles/account.css";
import {ArrowSyncFilled} from "@fluentui/react-icons";

const Messages = memo(function() {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMessages = () => {
        setLoading(true);
        axios.get('/data/messages')
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchMessages()
    }, []);

    return <>
        <div className={'marginsDef tablePosition'}>
            <LargeTitle>Wiadomości</LargeTitle>
            <Button appearance="primary" icon={<ArrowSyncFilled />} onClick={fetchMessages}>Odśwież</Button>
        </div>
        {loading ? <Loader label="Pobieranie wiadomości"/> : (messages.length === 0) ? <MessageBar intent="success" layout="multiline" className="accountContainer messagesContainer">
                    <MessageBarBody>
                        <MessageBarTitle>Wszystko w porządku</MessageBarTitle><br />
                        Brak nowych wiadomości oraz komunikatów systemowych.
                    </MessageBarBody>
                    </MessageBar> : <MessageBarGroup className={"accountContainer messagesContainer"}>
                {messages.map((message, key) => (
                <MessageBar key={key} intent="info">
                    <MessageBarBody>
                        <MessageBarTitle>{message.title}</MessageBarTitle>
                        <MessageBarActions>
                            <Dialog>
                                <DialogTrigger>
                                    <Button>Pokaż wiadomość</Button>
                                </DialogTrigger>
                                <DialogBody>
                                    <DialogTitle>{message.title}</DialogTitle>
                                    <DialogContent>
                                        {message.content}
                                    </DialogContent>
                                    <DialogActions>
                                        <DialogTrigger disableButtonEnhancement>
                                            <Button appearance={"secondary"}>Zamknij</Button>
                                        </DialogTrigger>
                                    </DialogActions>
                                </DialogBody>
                            </Dialog>
                        </MessageBarActions>
                    </MessageBarBody>
                </MessageBar>
            ))}
        </MessageBarGroup>}
    </>
})

export default Messages
