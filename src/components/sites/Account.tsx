import {ChangeEvent, memo, useEffect, useState} from 'react'
import {
    LargeTitle,
    Input,
    Field,
    Button,
    Dialog,
    DialogTrigger,
    makeStyles,
    tokens,
    DialogSurface,
    DialogTitle,
    DialogBody,
    DialogContent,
    Text,
    DialogActions,
    Spinner, MessageBar
} from "@fluentui/react-components";
import {
    DeleteFilled,
    EditFilled,
    LockClosedKeyFilled,
    MailFilled,
    PasswordFilled,
    PersonRegular
} from "@fluentui/react-icons";
import axios from "../../../axiosConfig.ts";
import {PersonAllData} from "../../interfaces/PersonAllData.tsx";

interface PasswordUpdate {
    newPassword: string;
    newPasswordConfirm: string;
}

const useStyles = makeStyles({
    buttonRed: {
        background: tokens.colorPaletteRedBackground2
    }
})

const Account = memo(function() {
    const [data, setData] = useState<PersonAllData | null>(null);
    const [passwdUpdate, setPasswordUpdate] = useState<PasswordUpdate>( { newPassword: "", newPasswordConfirm: "" } )
    const classes = useStyles();
    const [isAction, setAction] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [diffPassword, setDiffPassword] = useState(false);

    const icon = isAction ? (<Spinner size={"tiny"} />) : null;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPasswordUpdate((prevPass) => ({
            ...prevPass,
            [name]: value
        }));
    };

    useEffect(() => {
        axios.get('/user/data', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }).then(response => {
            setData(response.data);
            console.log(data);
        })
    }, []);

    const goDelete = () => {
        axios.delete('/user/deleteUser', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        }).then(response => {
            if(response.status === 200) {
                localStorage.removeItem('token');
                window.location.replace('/');
            }
        })
    }

    const handlePasswordUpdate = () => {
        setAction(true);
        setDiffPassword(false);
        if(passwdUpdate.newPassword !== passwdUpdate.newPasswordConfirm) {
            setAction(false);
            setDiffPassword(true);
        } else {
            axios.post('/user/updatePassword', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': ' application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                data: {
                    newPassword: passwdUpdate.newPasswordConfirm
                }
            }).then(response => {
                if(response.status === 200) {
                    setAction(false);
                    setPasswordModal(false);
                }
            })
        }

    }

    return <>
        <div className={'tablePosition'}>
            <LargeTitle>Konto</LargeTitle>
        </div>
        <Field label="Nazwa użytkownika" className="labelStyle">
            <Input contentBefore={<PersonRegular />} readOnly type="text" name="username" value={data?.name || ""} />
        </Field>
        <Field label="Adres e-mail" className="labelStyle">
            <Input contentBefore={<MailFilled />} readOnly type="email" name="email" value={data?.email || ""} />
        </Field>
        <Field label="Hasło" className="labelStyle">
            <Input contentBefore={<LockClosedKeyFilled />} disabled type="password" name="password" value={"abcdefghijklmnopqrstuvwxyz"} />
        </Field>
        <div className={'buttonGroup'} style={{justifyContent: 'end'}}>
            <Dialog modalType='alert' open={passwordModal}>
                <DialogTrigger>
                    <Button icon={<PasswordFilled />} onClick={() => setPasswordModal(true)}>Zmień hasło</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogTitle>Zmiana hasła</DialogTitle>
                    <DialogContent>
                        {diffPassword && <MessageBar intent={"error"}>
                            Hasła są różne!
                        </MessageBar>}
                        <Field required label="Nowe hasło" className="labelStyle">
                            <Input required type="password" name="newPassword" onChange={handleChange} disabled={isAction}/>
                        </Field>
                        <Field required label="Powtórz hasło" className="labelStyle">
                            <Input required type="password" name="newPasswordConfirm" onChange={handleChange} disabled={isAction}/>
                        </Field>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary" disabled={isAction}>Anuluj</Button>
                        </DialogTrigger>
                        <Button appearance="primary" onClick={handlePasswordUpdate} disabled={isAction} icon={icon}>{isAction ? "Zmiana hasła" : "Zmień hasło"}</Button>
                    </DialogActions>
                </DialogSurface>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <Button icon={<EditFilled />}>Zmień nazwę użytkownika lub adres e-mail</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogTitle>Zmiana danych</DialogTitle>
                    <DialogBody>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Anuluj</Button>
                            </DialogTrigger>
                            <Button appearance="primary">Aktualizuj dane</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            <Dialog>
                <DialogTrigger>
                    <Button icon={<DeleteFilled />} className={classes.buttonRed}>Usuń konto</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogTitle>Usuwanie konta</DialogTitle>
                    <DialogBody>
                        <DialogContent>
                            <Text>Czy napewno chcesz usunąć konto? Wszelkie dane odnośnie parkowania oraz zgromadzone środki zostaną usunięte bezpowrotnie!</Text>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Anuluj</Button>
                            </DialogTrigger>
                            <Button icon={<DeleteFilled />} className={classes.buttonRed} onClick={goDelete}>Usuń konto</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    </>
})

export default Account
