import {memo, useState} from 'react'
import {
    LargeTitle,
    Input,
    Field,
    Button,
    Dialog,
    DialogTrigger,
    makeStyles,
    tokens,
    DialogSurface, DialogTitle, DialogBody, DialogContent, MessageBar, MessageBarBody, Text, DialogActions
} from "@fluentui/react-components";
import {DeleteFilled, EditFilled, PasswordFilled} from "@fluentui/react-icons";
import PersonData from "../../interfaces/PersonData.tsx";

const useStyles = makeStyles({
    buttonRed: {
        background: tokens.colorPaletteRedBackground2
    }
})

const Account = memo(function() {
    const [data, setData] = useState<PersonData | null>();
    const classes = useStyles();
    return <>
        <div className={'tablePosition'}>
            <LargeTitle>Konto</LargeTitle>
        </div>
        <Field label="Nazwa użytkownika" className="labelStyle">
            <Input readOnly type="text" name="username" defaultValue={"Test01"} />
        </Field>
        <Field label="Adres e-mail" className="labelStyle">
            <Input readOnly type="email" name="email" defaultValue={"test01@test01.pl"} />
        </Field>
        <Field label="Hasło" className="labelStyle">
            <Input disabled type="password" name="password" defaultValue={"abcdefghijklmnopqrstuvwxyz"} />
        </Field>
        <div className={'buttonGroup'} style={{justifyContent: 'end'}}>
            <Dialog modalType='alert'>
                <DialogTrigger>
                    <Button icon={<PasswordFilled />}>Zmień hasło</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogTitle>Zmiana hasła</DialogTitle>
                    <DialogContent>
                        <Field required label="Aktualne hasło" className="labelStyle">
                            <Input required type="password" name="oldPassword" />
                        </Field>
                        <Field required label="Nowe hasło" className="labelStyle">
                            <Input required type="password" name="newPassword1" />
                        </Field>
                        <Field required label="Powtórz hasło" className="labelStyle">
                            <Input required type="password" name="newPassword2" />
                        </Field>
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Anuluj</Button>
                        </DialogTrigger>
                        <Button appearance="primary">Zmień hasło</Button>
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
                            <MessageBar intent={"error"} style={{marginBottom: '10px'}}>
                                <MessageBarBody>
                                    Przed usunięciem konta, należy wypłacić środki jeśli saldo jest większe niż 5 zł
                                </MessageBarBody>
                            </MessageBar>
                            <Text>Czy napewno chcesz usunąć konto? Wszelkie dane odnośnie parkowania zostaną usunięte bezpowrotnie!</Text>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Anuluj</Button>
                            </DialogTrigger>
                            <Button icon={<DeleteFilled />} className={classes.buttonRed} disabled={data?.balance < 5}>Usuń konto</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    </>
})

export default Account
