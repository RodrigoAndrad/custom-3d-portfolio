import { useRef, useEffect } from 'react'
import PortfolioThemeConfig from '../constants/SiteThemeConfig';


const HomeInfo = ({ bgColorStage }) => {
    const articleRef = useRef();
    useEffect(() => {
        articleRef.current.style.backgroundColor = `rgb(
            ${PortfolioThemeConfig.homeInfoBox.background.color.rgba.r}, 
            ${PortfolioThemeConfig.homeInfoBox.background.color.rgba.g}, 
            ${PortfolioThemeConfig.homeInfoBox.background.color.rgba.b}, 
            ${(100 - bgColorStage) * 0.01}
            )`;
        articleRef.current.style.boxshadow = `rgb(
                ${PortfolioThemeConfig.homeInfoBox.boxShadow.color.rgba.r}, 
                ${PortfolioThemeConfig.homeInfoBox.boxShadow.color.rgba.g}, 
                ${PortfolioThemeConfig.homeInfoBox.boxShadow.color.rgba.b}, 
                ${bgColorStage * 0.01}
                )`;
    }, [bgColorStage])

    return (
        <article ref={articleRef} className={`top-30 left-[10%] w-[30%] h-[80%] absolute align-middle text-center border-2 border-black rounded-2xl ${(bgColorStage === 0) ? 'bg-amber-300/20' : 'bg-white'}`} style={{ fontFamily: 'Shojumaru' }}>
            <div className='w-full h-full shadow-xl'>
                <h1 className='pt-2'>Sobre</h1>
                <p className='p-4 text-left'>
                    Olá. Me chamo Rodrigo e sou desenvolvedor de software há mais de 15 anos.<br />
                    Ao longo desse tempo trabalhei<br /> 
                    com diversas linguagens de <br />
                    programação, atuei como professor <br />
                    universitário, gerenciei projetos,<br />
                    palestrei em eventos e pude conhecer <br />
                    diferentes segmentos do mercado.
                </p>
                <p className='p-4 text-left'>
                    Sou proficiente em diversas tecnologias, atuo tanto em front-end como em <br />
                    back-end, assim como em arquitetura de<br />
                    sistemas e alguns aspectos de infraestrutura.
                </p>
                <p className='p-4 text-left'>
                    Conheço metodologias de projetos, boas práticas de testes,<br />
                    tecnologias em nuvem, integração contínua e implantação contínua.
                </p>
                <button className='w-[50%] absolute bottom-0 right-[10%]'>Para saber mais visite a área SOBRE no menu de navegação, aperte a tecla "S" em seu teclado ou use o Scanner.</button>
            </div>
        </article>
    )
}

export default HomeInfo