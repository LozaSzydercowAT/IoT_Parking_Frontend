import {Image} from "@fluentui/react";
import '../../assets/styles/about.css'
import {Body2, LargeTitle, Subtitle1, Subtitle2, Subtitle2Stronger, Title3} from "@fluentui/react-components";

function About() {
    const persons = [
        {
            name: "Gabriel Falisiewicz",
            tasks: "backend - komunikacja z płytką, hardware"
        },
        {
            name: "Aleksander Wajs",
            tasks: "backend - łącze z frontend, JWT, websockets"
        },
        {
            name: "Filip Witkowski",
            tasks: "frontend - aplikacja webowa"
        },
    ]

    return <div className='aboutContainer contentLayout'>
        <div className={'aboutHeader'}>
            <div className={'contentLayout'}>
                <LargeTitle>O nas</LargeTitle>
                <Title3>&copy; 2025 Copyright by Loża Szyderców Akademia Tarnowska</Title3>
                <Subtitle1>Skład drużyny</Subtitle1>
            </div>
            <Image src='/assets/ki.jpg' alt="logo KI" height={'90px'}/>
        </div>
        <ul>
            {persons.map((person, index) => (
                <li key={index}><Subtitle2Stronger>{person.name}</Subtitle2Stronger><Body2> - {person.tasks}</Body2></li>
            ))}
        </ul>
        <Subtitle2>Projekt na przedmiot <i>Technologie webowe w aplikacjach Internetu Rzeczy</i></Subtitle2>
    </div>
}

export default About;
