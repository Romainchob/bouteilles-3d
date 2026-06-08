import { addPropertyControls, ControlType } from "framer"
import { useEffect } from "react"

export default function BottlesViewer({
    defaultTitle,
    migliaLink,
    migliiaUrl,
    migliaScale,
    migliaLabel,
    migliaTag,
    migliaDomain,
    papaLink,
    papaUrl,
    papaScale,
    papaLabel,
    papaTag,
    papaDomain,
    rougeLink,
    rougeUrl,
    rougeScale,
    rougeLabel,
    rougeTag,
    rougeDomain,
    biereLink,
    biereUrl,
    biereScale,
    biereLabel,
    biereTag,
    biereDomain,
    canetteLink,
    canetteUrl,
    canetteScale,
    canetteLabel,
    canetteTag,
    canetteDomain,
    cameraDistance,
    spacing,
    rotationY,
    verticalOffset,
    tooltipBg,
    tooltipColor,
    tooltipFont,
    tooltipSize,
    tooltipRadius,
    style,
}) {
    const BASE = `https://romainchob.github.io/bouteilles-3d/viewer2.html?t=${Date.now()}`
    const params = new URLSearchParams()

    const bottles = [
        {
            url: migliiaUrl,
            link: migliaLink,
            scale: migliaScale,
            label: migliaLabel,
            tag: migliaTag,
            domain: migliaDomain,
        },
        {
            url: papaUrl,
            link: papaLink,
            scale: papaScale,
            label: papaLabel,
            tag: papaTag,
            domain: papaDomain,
        },
        {
            url: rougeUrl,
            link: rougeLink,
            scale: rougeScale,
            label: rougeLabel,
            tag: rougeTag,
            domain: rougeDomain,
        },
        {
            url: biereUrl,
            link: biereLink,
            scale: biereScale,
            label: biereLabel,
            tag: biereTag,
            domain: biereDomain,
        },
        {
            url: canetteUrl,
            link: canetteLink,
            scale: canetteScale,
            label: canetteLabel,
            tag: canetteTag,
            domain: canetteDomain,
        },
    ]

    let idx = 1
    bottles.forEach((b) => {
        if (b.url) {
            params.set("url" + idx, b.url)
            params.set("link" + idx, b.link || "/")
            params.set("scale" + idx, String(b.scale || 1))
            if (b.label) params.set("label" + idx, b.label)
            if (b.tag) params.set("tag" + idx, b.tag)
            if (b.domain) params.set("domain" + idx, b.domain)
            idx++
        }
    })

    params.set("cam", String(cameraDistance || 7))
    params.set("spacing", String(spacing || 1.4))
    params.set("roty", String(rotationY || 270))
    if (defaultTitle) params.set("defaultTitle", defaultTitle)

    // Styles du tooltip
    if (tooltipBg) params.set("tooltipBg", tooltipBg)
    if (tooltipColor) params.set("tooltipColor", tooltipColor)
    if (tooltipFont) params.set("tooltipFont", tooltipFont)
    if (tooltipSize) params.set("tooltipSize", tooltipSize + "px")
    if (tooltipRadius) params.set("tooltipRadius", tooltipRadius + "px")

    const src = `${BASE}&${params.toString()}`

    useEffect(() => {
        function onMessage(e) {
            if (e.data?.type === "navigate" && e.data?.link)
                window.location.assign(e.data.link)
        }
        window.addEventListener("message", onMessage)
        return () => window.removeEventListener("message", onMessage)
    }, [])

    const offset = verticalOffset || 0

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                ...style,
            }}
        >
            <iframe
                src={src}
                style={{
                    width: "100%",
                    height: `calc(100% + ${offset}px)`,
                    marginTop: `-${offset}px`,
                    border: "none",
                    background: "transparent",
                }}
                scrolling="no"
            />
        </div>
    )
}

addPropertyControls(BottlesViewer, {
    defaultTitle: {
        type: ControlType.String,
        title: "🏠 Titre Accueil",
        defaultValue: "La sélection",
    },
    verticalOffset: {
        type: ControlType.Number,
        title: "⬇️ Décalage bas",
        defaultValue: 150,
        min: 0,
        max: 600,
        step: 10,
        displayStepper: true,
    },

    // ── Tooltip style ──
    tooltipBg: {
        type: ControlType.Color,
        title: "💬 Tooltip - Fond",
        defaultValue: "rgba(0,0,0,0.75)",
    },
    tooltipColor: {
        type: ControlType.Color,
        title: "💬 Tooltip - Texte",
        defaultValue: "#ffffff",
    },
    tooltipFont: {
        type: ControlType.String,
        title: "💬 Tooltip - Police",
        defaultValue: "sans-serif",
    },
    tooltipSize: {
        type: ControlType.Number,
        title: "💬 Tooltip - Taille px",
        defaultValue: 13,
        min: 8,
        max: 30,
        step: 1,
        displayStepper: true,
    },
    tooltipRadius: {
        type: ControlType.Number,
        title: "💬 Tooltip - Radius px",
        defaultValue: 6,
        min: 0,
        max: 30,
        step: 1,
        displayStepper: true,
    },

    // ── Bouteille 1 ──
    migliiaUrl: {
        type: ControlType.String,
        title: "1️⃣ Bouteille 1 - URL",
        defaultValue: "https://romainchob.github.io/bouteilles-3d/bottlemiglia.glb",
    },
    migliaLabel: {
        type: ControlType.String,
        title: "1️⃣ Bouteille 1 - Nom",
        defaultValue: "Miglia",
    },
    migliaTag: {
        type: ControlType.String,
        title: "1️⃣ Bouteille 1 - Type",
        defaultValue: "Vin rouge",
    },
    migliaDomain: {
        type: ControlType.String,
        title: "1️⃣ Bouteille 1 - Vigneron",
        defaultValue: "MonBissac",
    },
    migliaScale: {
        type: ControlType.Number,
        title: "1️⃣ Bouteille 1 - Taille",
        defaultValue: 1.8,
        min: 0.1,
        max: 5,
        step: 0.1,
        displayStepper: true,
    },
    migliaLink: {
        type: ControlType.String,
        title: "1️⃣ Bouteille 1 - 🔗 Page",
        defaultValue: "/product",
    },

    // ── Bouteille 2 ──
    papaUrl: {
        type: ControlType.String,
        title: "2️⃣ Bouteille 2 - URL",
        defaultValue: "https://romainchob.github.io/bouteilles-3d/papa.glb",
    },
    papaLabel: {
        type: ControlType.String,
        title: "2️⃣ Bouteille 2 - Nom",
        defaultValue: "Papa",
    },
    papaTag: {
        type: ControlType.String,
        title: "2️⃣ Bouteille 2 - Type",
        defaultValue: "Bière ambrée",
    },
    papaDomain: {
        type: ControlType.String,
        title: "2️⃣ Bouteille 2 - Vigneron",
        defaultValue: "MonBissac",
    },
    papaScale: {
        type: ControlType.Number,
        title: "2️⃣ Bouteille 2 - Taille",
        defaultValue: 1.8,
        min: 0.1,
        max: 5,
        step: 0.1,
        displayStepper: true,
    },
    papaLink: {
        type: ControlType.String,
        title: "2️⃣ Bouteille 2 - 🔗 Page",
        defaultValue: "/product",
    },

    // ── Bouteille 3 ──
    rougeUrl: {
        type: ControlType.String,
        title: "3️⃣ Bouteille 3 - URL",
        defaultValue: "https://romainchob.github.io/bouteilles-3d/rougeglb.glb",
    },
    rougeLabel: {
        type: ControlType.String,
        title: "3️⃣ Bouteille 3 - Nom",
        defaultValue: "Rouge",
    },
    rougeTag: {
        type: ControlType.String,
        title: "3️⃣ Bouteille 3 - Type",
        defaultValue: "Vin blanc",
    },
    rougeDomain: {
        type: ControlType.String,
        title: "3️⃣ Bouteille 3 - Vigneron",
        defaultValue: "Domaine du haut bourg",
    },
    rougeScale: {
        type: ControlType.Number,
        title: "3️⃣ Bouteille 3 - Taille",
        defaultValue: 1.8,
        min: 0.1,
        max: 5,
        step: 0.1,
        displayStepper: true,
    },
    rougeLink: {
        type: ControlType.String,
        title: "3️⃣ Bouteille 3 - 🔗 Page",
        defaultValue: "/product",
    },

    // ── Bouteille 4 ──
    biereUrl: {
        type: ControlType.String,
        title: "4️⃣ Bouteille 4 - URL",
        defaultValue: "https://romainchob.github.io/bouteilles-3d/bierre.glb",
    },
    biereLabel: {
        type: ControlType.String,
        title: "4️⃣ Bouteille 4 - Nom",
        defaultValue: "Aperitivo",
    },
    biereTag: {
        type: ControlType.String,
        title: "4️⃣ Bouteille 4 - Type",
        defaultValue: "Apéritif",
    },
    biereDomain: {
        type: ControlType.String,
        title: "4️⃣ Bouteille 4 - Vigneron",
        defaultValue: "MonBissac",
    },
    biereScale: {
        type: ControlType.Number,
        title: "4️⃣ Bouteille 4 - Taille",
        defaultValue: 1.1,
        min: 0.1,
        max: 5,
        step: 0.1,
        displayStepper: true,
    },
    biereLink: {
        type: ControlType.String,
        title: "4️⃣ Bouteille 4 - 🔗 Page",
        defaultValue: "/product",
    },

    // ── Bouteille 5 ──
    canetteUrl: {
        type: ControlType.String,
        title: "5️⃣ Bouteille 5 - URL",
        defaultValue: "https://romainchob.github.io/bouteilles-3d/Canette2.glb",
    },
    canetteLabel: {
        type: ControlType.String,
        title: "5️⃣ Bouteille 5 - Nom",
        defaultValue: "La Petite Filoute",
    },
    canetteTag: {
        type: ControlType.String,
        title: "5️⃣ Bouteille 5 - Type",
        defaultValue: "Soda",
    },
    canetteDomain: {
        type: ControlType.String,
        title: "5️⃣ Bouteille 5 - Vigneron",
        defaultValue: "MonBissac",
    },
    canetteScale: {
        type: ControlType.Number,
        title: "5️⃣ Bouteille 5 - Taille",
        defaultValue: 0.8,
        min: 0.1,
        max: 5,
        step: 0.1,
        displayStepper: true,
    },
    canetteLink: {
        type: ControlType.String,
        title: "5️⃣ Bouteille 5 - 🔗 Page",
        defaultValue: "/product",
    },

    // ── Caméra & Scène ──
    cameraDistance: {
        type: ControlType.Number,
        title: "📷 Caméra",
        defaultValue: 7,
        min: 2,
        max: 15,
        step: 0.5,
        displayStepper: true,
    },
    spacing: {
        type: ControlType.Number,
        title: "↔️ Espacement",
        defaultValue: 1.4,
        min: 0.5,
        max: 4,
        step: 0.1,
        displayStepper: true,
    },
    rotationY: {
        type: ControlType.Number,
        title: "🔄 Rotation Y",
        defaultValue: 270,
        min: 0,
        max: 360,
        step: 90,
        displayStepper: true,
    },
})
