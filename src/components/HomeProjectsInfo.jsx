import { useRef, useEffect } from 'react'
import PortfolioThemeConfig from '../constants/SiteThemeConfig';


const HomeProjectsInfo = ({ bgColorStage }) => {
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
        <article ref={articleRef} className={`shadow-lg  top-30 right-[10%] w-[30%] h-[80%] absolute align-middle text-center border-2 border-black rounded-2xl ${(bgColorStage === 0) ? 'bg-amber-300/20' : 'bg-white'}`} style={{ fontFamily: 'Shojumaru' }}>
            <div>
                <h1 className='pt-2'>Projetos</h1>
                <p className='p-4 text-right'>
                    Atuei em diveros tipos de projetos, sejam hotsites para divulgações de campanhas publicitárias ou lançamentos de produtos,<br />
                    à clientes de sistemas de medições de<br /> 
                    qualidade de internet executados em <br />
                    plataformas windows.
                </p>
                <p className='p-4 text-right'>
                    Desempenhei diferentes papéis em uma<br />
                    ampla gama de projetos participando<br />
                    como divulgador, como gerente de<br />
                    projetos, como desenvolvedor back-end,<br />
                    como desenvolvedor front-end, como<br />
                    desenvolvedor fullstack, sempre buscando<br />
                    contribuir ativamente para o sucesso de<br />
                    cada projeto.
                </p>
               
                <button className='w-[50%] absolute bottom-0 left-[15%]'>Para saber mais clique em PROJETOS no menu de navegação, aperte a tecla "P" em seu teclado ou ligue a TV.</button>
            </div>
        </article>
    )
}

export default HomeProjectsInfo