// picks black or white against the palette colour brightness
export const contrastTextColor = (color: unknown[]) => [
  "let",
  "rgba",
  ["to-rgba", color],
  [
    "case",
    [
      ">",
      [
        "+",
        ["*", 0.299, ["at", 0, ["var", "rgba"]]],
        ["*", 0.587, ["at", 1, ["var", "rgba"]]],
        ["*", 0.114, ["at", 2, ["var", "rgba"]]],
      ],
      115,
    ],
    "#000000",
    "#ffffff",
  ],
]
