import { useRef, useEffect } from 'react'
import PortfolioThemeConfig from '../constants/SiteThemeConfig';


const HomeContactInfo = ({ bgColorStage }) => {
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
        <article ref={articleRef} className={`shadow-lg  top-30 left-[10%] w-[80%] h-[80%] absolute align-middle text-center border-2 border-black rounded-2xl ${(bgColorStage === 0) ? 'bg-amber-300/20' : 'bg-white'}`} style={{ fontFamily: 'Shojumaru' }}>
            <div className='grid'>
                <h1 className='pt-2'>Contato</h1>
                <h2 className='p-4 text-right text-lg underline'>
                    Entre em contato por um dos canais:
                </h2>
                <div className='p-4 text-left'>
                    Email: rodrigo.s.andrade@gmail.com< br />
                    Escreva para mim apertando< br />
                    a tecla "M" em seu teclado
                </div>
                <p className='p-4 text-right'>
                    Rodrigo Siqueira de Andrade @ Linkedin<br />
                    Acesse apertando a tecla "L" em seu<br />
                    teclado
                </p>
                <div className='p-4 text-left'>
                    +55 (11) 98276-7685
                </div>
                <p className='p-4 text-right'>
                    RodrigoAndrade @ Github<br />
                    Acesse apertando a tecla "G" em seu<br />
                    teclado
                </p>
                <p className='p-4 text-left'>
                    <a href={'#'} >Faça o download do meu CV <br />apertando a tecla "D" em seu teclado</a>
                </p>
                <p className='p-4 text-right'>
                    Desenvolvido em 2025 ©
                </p>
                <button className='w-[60%] absolute bottom-0 left-[28%]'>Vamos conversar. Mande uma mensagem apertando a tecla "M" de seu teclado, explore o site ou use o rádio.</button>
            </div>
        </article>
    )
}

export default HomeContactInfo